import mongoose from "mongoose";

import { hashPassword, comparePassword } from "../utils/Hasher";
import { generateToken, storeRefreshToken } from "./TokenService";

import { UserInformation } from "../models/Information";
import { UserCredentials } from "../models/Authentication";

import { Token } from "../models/Token";

import dotenv from "dotenv";
dotenv.config();
interface LoginInput {
    identifier: string;
    password: string;
};
interface LogoutInput {
    userID: string;
    refreshToken: string;
};

export const handleLogin = async ({ identifier, password }: LoginInput) => {
  // Check if identifier is an email or username
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const user = await UserInformation.findOne(
    isEmail ? { email_address: identifier } : { username: identifier }
  );
  if (!user) {
    throw new Error("User not found");
  }
  
  //Check credentials in UsersCrendentials collection
  const credentials = await UserCredentials.findOne({ userID: user._id });
  if (!credentials) {
    throw new Error("Credentials not found for user");
  }

  //Compare passwords
  const passwordMatches = await comparePassword(password, credentials.hashed_password);
  if (!passwordMatches) {
    throw new Error("Invalid password");
  }

  // Generate Tokens
  const accessToken = await generateToken(user._id.toString(), 'access');
  const refreshToken = await generateToken(user._id.toString(), 'refresh'); 
  
  // Save refresh token server-side
  const expiresInMs = 24 * 60 * 60 * 1000; //1 day
  storeRefreshToken(refreshToken, user._id.toString(), expiresInMs);

  return {
    message: "Login successful",    
    userID: user._id,
    accessToken,
    refreshToken
  };
};

export const insertUserPassword = async (userID: string, password: string, session: mongoose.ClientSession) => {
  const hashed_password = await hashPassword(password);
  const userCredentials = new UserCredentials({
    userID,
    hashed_password
  });

  const savedUserCredentials = await userCredentials.save({ session });
  if (!savedUserCredentials) {
    throw new Error("User credentials not created"); // unlikely, but safety check
  }
  return savedUserCredentials;
};

export const updateUserPassword = async (userID: string, newPassword: string) => {
  const hashed_password = await hashPassword(newPassword);
  
  try {
    await UserCredentials.findOneAndUpdate( { userID }, { hashed_password } );
    return {
      success: true,
      message: "Password updated successfully"
    };
  }
  catch (err: any) {
    throw new Error("Failed to update password");
  } 
};

export const deleteUserPassword = async (userID: string, session: mongoose.ClientSession) => {  
  const deletedCredentials = await UserCredentials.findOneAndDelete({ userID }, { session });
  console.log("Deleted user credentials:", deletedCredentials);
  if (!deletedCredentials) {
    throw new Error("User credentials not found or already deleted");
  }
  return deletedCredentials;
};

export const handleLogout = async ({ userID, refreshToken }: LogoutInput) => {
  try {
    //Deleting refresh token from the database
    await Token.deleteOne({
      token: refreshToken,
      userID: new mongoose.Types.ObjectId(userID)
    });
    return { 
      success: true,
      message: "Logged out successfully"
    }
  }
  catch (err: any) {
    throw new Error("Logout failed");
  }
};