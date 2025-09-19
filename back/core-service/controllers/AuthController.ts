import { Request, Response, NextFunction } from "express";

import { handleLogin, handleLogout, updateUserPassword } from "../services/AuthService";

import { verifyToken } from "../services/TokenService";


export const login = async (req: Request, res: Response) => {
  // #region Swagger Description
  /*
  * #swagger.tags = ['Authentication']
  * #swagger.description = 'Login'
  * #swagger.parameters['body'] = {
     in: 'body',
     description: 'Login with username/email and password',
     required: true,
     schema: {   
      "identifier": "testtest",
      "password": "password123"
     }
  }
  */
  // #endregion Swagger Description
  try {
    const result = await handleLogin(req.body);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ userID: result.userID, accessToken: result.accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Login failed" });    
  }
};

export const logout = async (req: Request, res: Response) => {
  // #region Swagger Description
  /*
  * #swagger.tags = ['Authentication']
  * #swagger.description = 'Logout'
  * #swagger.parameters['body'] = {
     in: 'body',
     description: 'Logout user by invalidating the refresh token',
     required: true,
     schema: {   
      "userID": "",
      "refreshToken": ""
     }
  }
  */
  // #endregion Swagger Description
  try {
    const result = await handleLogout(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Logout failed" });    
  }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // #region Swagger Description
/*
 * #swagger.tags = ['User']
 * #swagger.description = 'Get user profile'
 * #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Bearer access token',
        required: true,
        type: 'string',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsInR...'
 }
 * #swagger.responses[200] = {
        description: 'User profile retrieved successfully'
 }
 * #swagger.responses[401] = {
        description: 'Unauthorized - Invalid or missing token'
 }
 */
 // #endregion Swagger Description
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader){
      return res.status(401).json({ message: "Missing header" });
    }
    // 'Bearer <token>'
    const token = authHeader.split(" ")[1];
    if (!token){
      return res.status(401).json({ message: "Missing token" });
    }

    // Verify the access token
    const isValid = await verifyToken(token, "access");
    if (!isValid) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    
    //Attach the userID in the request object for downstream use
    (req as any).userID = isValid;
    
    next();
  }
  catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCredentials = async (req: Request, res: Response) => {
  // #region Swagger Description
  /*
  * #swagger.tags = ['Authentication']
  * #swagger.description = 'Login'
  * #swagger.parameters['body'] = {
     in: 'body',
     description: 'Update user password',
     required: true,
     schema: {   
      "newPassword": "password123"
     }
  }
  */
  // #endregion Swagger Description
  try {
    await updateUserPassword((req as any).userID, req.body.newPassword);
    res.status(200).json({ message: "Password updated successfully", userID: req.body.userID });  
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to update password" });    
  }
};
