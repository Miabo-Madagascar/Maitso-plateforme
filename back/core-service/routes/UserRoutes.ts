import { Router } from "express";

import { createNewUser, updateUser, deleteUser } from "../controllers/UserController";

import { authenticate } from "../controllers/AuthController";

const userRouter = Router();

userRouter.post("/users", createNewUser);

userRouter.patch("/users", authenticate, updateUser);

userRouter.delete("/users/:userID", authenticate, deleteUser);

export default userRouter;