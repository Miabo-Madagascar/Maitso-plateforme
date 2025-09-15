import { Request, Response } from "express";    

import { checkUsernameExists, checkEmailExists, registerUser, updateUserInformation, removeUser } from "../services/UserService";

import { UserInformation } from "../models/Information";

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

    //Save new user
    const result = await registerUser(req.body);
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
      "userID": "",
      "first_name": "test",
      "last_name": "TEST",
      "user_type": "admin",
      "email_address": "test.test@gmail.com",
      "username": "testtest",
      "phone_number": "1234567890"
     }
  }
  */
 // #endregion Swagger Description
 try {
    const { userID, username, email_address } = req.body;

    // Vérifier si le username existe pour un autre utilisateur
    const usernameExists = await UserInformation.findOne({
      username: username,
      _id: { $ne: userID } // exclut l'utilisateur en cours
    });
    if (usernameExists) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    // Vérifier si l'email existe pour un autre utilisateur
    const emailExists = await UserInformation.findOne({
      email_address: email_address,
      _id: { $ne: userID } // exclut l'utilisateur en cours
    });
    if (emailExists) {
      return res.status(409).json({ success: false, message: "Email address already exists" });
    }

    //Update the user's information
    const result = await updateUserInformation(req.body);
    console.log(result);
    return res.status(201).json({
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

