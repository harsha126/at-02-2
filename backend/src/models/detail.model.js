import mongoose from "mongoose";

const detailSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        trade: { type: String, required: false },
        dob: { type: Date, required: false },
        phoneNumber: { type: String, required: false },
        address: { type: String, required: false },
        wifeName: { type: String, required: false },
        children: { type: Number, required: false },
        lastPosting: { type: String, required: false },
        dod: { type: Date, required: false },
        company: { type: String, required: false },
        designation: { type: String, required: false },
        placeOfWork: { type: String, required: false },
        dom: { type: Date, required: false },
        homeTown: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
