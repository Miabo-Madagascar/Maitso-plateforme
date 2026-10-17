import { Request, Response } from "express";    
import mongoose from "mongoose";

import { checkUsernameExists, checkEmailExists, registerUser, updateUserInformation, removeUser, isAdmin } from "../services/UserService";

import { verifyToken } from "../services/TokenService";

import { UserInformation } from "../models/Information";

// Returns the userID of the caller if a valid access token is provided, otherwise null
const getRequesterID = async (req: Request): Promise<string | null> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return null;
  }
  const userID = await verifyToken(token, "access");
  return typeof userID === "string" ? userID : null;
};

export const createNewUser = async (req: Request, res: Response) => { 
// #region Swagger Description
  /*
  * #swagger.tags = ['Users']
  * #swagger.description = 'Create a new user'
  * #swagger.parameters['body'] = {
     in: 'body',
     description: 'User info',
     required: true,
     schema: {   
      "first_name": "test",
      "last_name": "TEST",
      "user_type": "admin",
      "email_address": "test.test@gmail.com",
      "username": "testtest",
      "phone_number": "1234567890",
      "password": "password123"
     }
  }
  */
 // #endregion Swagger Description
  try {
    //Check if username already exists
    const { username } = req.body;
    const usernameExists = await checkUsernameExists( username );
    if(usernameExists) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }
    
    //Check if email address already exists
    const { email_address } = req.body;
    const emailExists = await checkEmailExists( email_address );
    if(emailExists) {
      return res.status(409).json({ success: false, message: "Email address already exists" });
    }

    //Only an authenticated admin may choose the role of the new user
    const requesterID = await getRequesterID(req);
    const requesterIsAdmin = requesterID ? await isAdmin(requesterID) : false;
    const user_type = requesterIsAdmin && req.body.user_type ? req.body.user_type : "user";

    //Save new user
    const result = await registerUser({ ...req.body, user_type });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: result._id
    });
  }
  catch (err: any) {
    return res.status(400).json({ error: err.message || "Failed to create new user" });
  }
};

export const updateUser = async (req: Request, res: Response) => { 
  // #region Swagger Description
  /*
  * #swagger.tags = ['Users']
  * #swagger.description = 'Update an existing user'
  * #swagger.parameters['body'] = {
     in: 'body',
     description: 'User info',
     required: true,
     schema: {
      "first_name": "test",
      "last_name": "TEST",
      "email_address": "test.test@gmail.com",
      "username": "testtest",
      "phone_number": "1234567890"
     }
  }
  */
 // #endregion Swagger Description
 try {
    //A user can only update their own profile (the ID comes from the access token)
    const userID: string = (req as any).userID;
    const { username, email_address } = req.body;

    // Vérifier si le username existe pour un autre utilisateur
    const usernameExists = username !== undefined && await UserInformation.findOne({
      username: username,
      _id: mongoose.trusted({ $ne: userID }) // exclut l'utilisateur en cours
    });
    if (usernameExists) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    // Vérifier si l'email existe pour un autre utilisateur
    const emailExists = email_address !== undefined && await UserInformation.findOne({
      email_address: email_address,
      _id: mongoose.trusted({ $ne: userID }) // exclut l'utilisateur en cours
    });
    if (emailExists) {
      return res.status(409).json({ success: false, message: "Email address already exists" });
    }

    //Update the user's information
    const result = await updateUserInformation(userID, req.body);
    if (!result) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully"
    });
  }
  catch (err: any) {
    return res.status(400).json({ error: err.message || "Failed to update user's information" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  /*
* #swagger.tags = ['Users']
* #swagger.description = 'Delete a user by ID'
* #swagger.parameters['userID'] = {
     in: 'path',
     description: 'The ID of the user to delete',
     required: true,
     type: 'string',
     example: '68c85399e3468c6f110a6a09'
}
*/

  const { userID } = req.params;
  if (!userID) {
    return res.status(400).json({ success: false, message: "userID is required" });
  }

  //A user can only delete their own account, unless they are an admin
  const requesterID: string = (req as any).userID;
  if (requesterID !== userID && !(await isAdmin(requesterID))) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  try {
    await removeUser(userID);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err: any) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    return res.status(500).json({ success: false, error: err.message || "Failed to delete user" });
  }
};

