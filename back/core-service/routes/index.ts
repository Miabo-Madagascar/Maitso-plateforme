import { Router } from "express";

import authRouter from "./AuthRoutes";
import tokenRouter from "./TokenRoutes";

const router = Router();
router.use(authRouter);
router.use(tokenRouter);

export default router
