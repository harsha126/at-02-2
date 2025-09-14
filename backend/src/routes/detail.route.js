import { Router } from "express";
import { getDetails, saveDetails } from "../controllers/detail.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const detailRouter = new Router();

detailRouter.post("/", authenticateToken, saveDetails);
detailRouter.get("/", authenticateToken, getDetails);

export default detailRouter;
