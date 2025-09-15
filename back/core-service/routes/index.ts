import { Router } from "express";

import authRouter from "./AuthRoutes";
import tokenRouter from "./TokenRoutes";
import userRouter from "./UserRoutes";

const router = Router();
router.use(authRouter);
router.use(tokenRouter);
router.use(userRouter);

export default router;
