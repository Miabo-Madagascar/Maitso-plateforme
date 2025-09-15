import { Router } from "express";

import { login, logout, authenticate, updateCredentials } from "../controllers/AuthController"; 

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

authRouter.patch("/credentials", authenticate, updateCredentials);

export default authRouter;