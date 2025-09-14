import { Router } from "express";
import { saveDetails } from "../controllers/detail.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const detailRouter = new Router();

detailRouter.post("/", authenticateToken, saveDetails);

export default detailRouter;
