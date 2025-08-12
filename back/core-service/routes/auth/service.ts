import { comparePassword } from "../../utils/Hasher";
import { UserInformation } from "../../models/Information";
import { UserCredentials } from "../../models/Authentication";

interface LoginInput {
    identifier: string;
    password: string;
}

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

  return {
    message: "Login successful",
    userID: user._id,
    username: user.username,
    email: user.email_address,
  };
};
