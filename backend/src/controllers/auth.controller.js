import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { userId, password, fullName } = req.body;
    try {
        if (!userId || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const user = await User.findOne({ userId });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userId,
            fullName,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser, res);
            await newUser.save();
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

        return res.status(201).json({
            fullName: newUser.fullName,
            userId: newUser.userId,
            message: "User created successfully",
            profilePic: newUser.profilePic,
            oldPic: newUser.oldPic,
            createdAt: newUser.createdAt,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};
export const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        if (!userId || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user, res);
        res.status(200).json({
            fullName: user.fullName,
            userId: user.userId,
            message: "Login successful",
            profilePic: user.profilePic,
            oldPic: user.oldPic,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};
export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, oldPic } = req.body;
        const userId = req.user.userId;

        if (!profilePic && !oldPic) {
            return res.status(400).json({ message: "A Image is required" });
        }

        let profilePicUrl = "";
        let oldPicUrl = "";
        let updatedUser = null;
        if (profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            profilePicUrl = uploadResponse.secure_url;
            updatedUser = await User.findOneAndUpdate(
                { userId },
                { profilePic: profilePicUrl },
                { new: true }
            ).select("-password -__v -_id");
        }
        if (oldPic) {
            const uploadResponse = await cloudinary.uploader.upload(oldPic);
            oldPicUrl = uploadResponse.secure_url;
            updatedUser = await User.findOneAndUpdate(
                { userId },
                { oldPic: oldPicUrl },
                { new: true }
            ).select("-password -__v -_id");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLandingPageImages = async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression("folder:reunion1")
            .sort_by("created_at", "desc")
            .execute();
        const imageUrls = resources.map((img) => img.secure_url);
        res.status(200).json(imageUrls);
    } catch (error) {
        console.error("Error fetching landing page images:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
