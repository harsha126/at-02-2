import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
