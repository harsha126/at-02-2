import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
    sendMessage,
    getMessages,
    getUsers,
} from "../controllers/message.controller.js";

const messageRoute = Router();

messageRoute.post("/send/:id", sendMessage);
messageRoute.get("/users", authenticateToken, getUsers);
messageRoute.get("/:id", authenticateToken, getMessages);

export default messageRoute;
