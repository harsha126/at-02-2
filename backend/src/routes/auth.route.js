import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/signup", signup);
authRoute.post("/logout", logout);

export default authRoute;
