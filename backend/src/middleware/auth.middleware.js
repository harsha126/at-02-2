import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).send({ message: "No token provided" });

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(403).send({ message: "Invalid token" });
            req.user = {
                userId: user.userId,
                fullName: user.fullName,
            };

            const dbUser = await User.find({ userId: user.userId });
            if (!dbUser)
                return res.status(404).send({ message: "User not found" });

            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};
