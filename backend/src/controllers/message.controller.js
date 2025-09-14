import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloundinary from "../lib/cloudinary.js";
import { getSocketIdByUserId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const users = await User.find({ userId: { $ne: userId } }).select(
            "-password"
        );
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getMessages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = req.params.id;
        if (!userId || !id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const messages = await Message.find({
            $or: [
                { senderId: userId, recipientId: id },
                { recipientId: userId, senderId: id },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const recipientId = req.params.id;
        const senderId = req.user.userId;

        if (!senderId || !recipientId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let imageUrl = null;

        if (image) {
            imageUrl = await cloundinary.uploader.upload(image);
        }

        const newMessage = new Message({
            senderId,
            recipientId,
            text,
            image: imageUrl ? imageUrl.secure_url : null,
        });
        console.log(newMessage);
        await newMessage.save();

        const recId = getSocketIdByUserId(recipientId);
        if (recId) {
            io.to(recId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};
