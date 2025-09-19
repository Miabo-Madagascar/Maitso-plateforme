import { Request, Response } from "express";
import { refreshAccessToken } from '../services/TokenService';

export const requestNewAccessToken = async (req: Request, res: Response) => {    
  // #region Swagger Description
  /*
  * #swagger.tags = ['Token']
  * #swagger.description = 'Request a new access token'
  * #swagger.parameters['body'] = {
    in: 'body',
    description: 'Request a new access token using a valid refresh token and userID',
    required: true,
    schema: {   
     "userID": "68b55fda118021a248bfb2a4",
     "refreshToken": "da7b69d5151c2b75372d90874da3108cf5e5b5dcd849c516231dba5410405cc536a1d692617308a175aa09cc3bf1d36af93184656b6ec309321ea49b86bd79bf"
    }
  }
  */
  // #endregion Swagger Description
  try {
    const result = await refreshAccessToken(req.body.userID, req.body.refreshToken);
    
    res.cookie('refreshToken', result.newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ accessToken: result.newAccessToken });
  }
  catch (err: any) {
    res.status(400).json({ error: err.message || "Token request failed" });    
  }
};