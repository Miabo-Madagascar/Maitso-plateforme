import { Router } from "express";

import { login, register } from "./controller"; 

const authRouter = Router();

authRouter.use("/login", login);

authRouter.use("/register", register);

export default authRouter;