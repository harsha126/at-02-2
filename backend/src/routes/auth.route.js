import express from "express";
import {
    login,
    logout,
    signup,
    checkAuth,
    updateProfile,
    getLandingPageImages,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/signup", signup);
authRoute.post("/logout", logout);
authRoute.get("/images", getLandingPageImages);
authRoute.get("/check", authenticateToken, checkAuth);
authRoute.put("/update-profile", authenticateToken, updateProfile);

export default authRoute;
