import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        fullName: { type: String, required: true, unique: false },
        email: { type: String, required: false },
        password: { type: String, required: true, minlength: 6 },
        profilePic: { type: String, default: "" },
        oldPic: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

// Create a partial unique index for email only when email exists

export default User;
