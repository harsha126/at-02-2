import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { basicAuth } from "../middleware/basicAuth.middleware.js";
import { getLinks, saveLink } from "../controllers/link.controller.js";
import dotenv from "dotenv";

dotenv.config();

const linkRouter = Router();

linkRouter.get("/", authenticateToken, getLinks);
linkRouter.post(
    "/",
    basicAuth("admin", process.env.BASIC_AUTH_PASSWORD),
    saveLink
);

export default linkRouter;