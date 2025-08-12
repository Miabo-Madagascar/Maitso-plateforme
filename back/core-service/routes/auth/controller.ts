import { Request, Response } from "express";

import { handleLogin } from "./service";
import { error } from "console";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await handleLogin(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Login failed" });    
  }
};

export const register = (req: Request, res: Response) => {
  
  res.send("Register endpoint");
};