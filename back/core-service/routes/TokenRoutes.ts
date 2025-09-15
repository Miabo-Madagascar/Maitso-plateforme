import { Router } from "express";

import { requestNewAccessToken } from "../controllers/TokenController"; 

const tokenRouter = Router();

tokenRouter.post("/requestNewToken", requestNewAccessToken);

export default tokenRouter;