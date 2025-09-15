import mongoose from "mongoose";

import { UserInformation } from "../models/Information";

import { insertUserPassword, deleteUserPassword } from "./AuthService";

import { deleteUserTokens } from "./TokenService";

export const insertUser = async (data: any, session: mongoose.ClientSession)=> {
  const userInformation = new UserInformation({
    first_name: data.first_name,
    last_name: data.last_name,
    user_type: data.user_type,
    email_address: data.email_address,
    username: data.username,
    phone_number: data.phone_number
  });

  const savedUserInformation = await userInformation.save({ session });
  if (!savedUserInformation) {
    throw new Error("User not created"); // unlikely, but safety check
  }
  return savedUserInformation;
};

export const updateUserInformation = async (data: any) => {
  try {
    const { userID, ...updateFields } = data;

    const result = await UserInformation.findOneAndUpdate(
      { _id: userID },
      { $set: updateFields },
      { new: true }
    );
    return result;
  }
  catch (error: any) {
    throw new Error(error.message || "Failed to update user information");
  }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const user = await UserInformation.findOne({ username });
  return !!user;
};

export const checkEmailExists = async (email_address: string): Promise<boolean> => {
  const user = await UserInformation.findOne({ email_address });
  return !!user;
};

export const registerUser = async (data:any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try{
    const savedUser = await insertUser(data, session);
    await insertUserPassword(savedUser._id.toString(), data.password, session);
    await session.commitTransaction();
    session.endSession();
    return savedUser;
  }
  catch(err){
    await session.abortTransaction();
    session.endSession();
    throw new Error("User creation failed: " + (err as Error).message);
  }
};

export const removeUser = async (userID: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Delete user's information
    const deletedUser = await deleteUserInformation(userID, session);
    
    if (!deletedUser) {
      throw new Error("User not found or already deleted");
    }
    // Delete user's credential
    await deleteUserPassword(deletedUser._id.toString(), session);
    
    // Delete user's tokens
    await deleteUserTokens(deletedUser._id.toString(), session);
    
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    console.log(`User with ID ${userID} and associated data deleted successfully.`);  
    return deletedUser;
  }
  catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("User deletion failed: " + (err as Error).message);
  }
};

export const deleteUserInformation = async (userID: string, session: mongoose.ClientSession) => {
  const deletedUser = await UserInformation.findByIdAndDelete(userID, { session });
  console.log("Deleted user information:", deletedUser);
  if (!deletedUser) {
    throw new Error("User not found or already deleted");
  }
  return deletedUser;
};