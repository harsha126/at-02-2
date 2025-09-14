import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        recipientId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
        text: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
