import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
    const token = jwt.sign(
        { userId: user.userId, fullName: user.fullName },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return token;
};
