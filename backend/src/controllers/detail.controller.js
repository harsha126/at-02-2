import User from "../models/user.model.js";

export const saveDetails = async (req, res) => {
    const details = req.body;
    const userKeys = Object.keys(User.schema.paths).filter(
        (key) => key !== "__v"
    );

    for (const key in details) {
        if (
            details[key] === null ||
            details[key] === "" ||
            !userKeys.includes(key)
        ) {
            delete details[key];
        }
    }

    console.log(details);

    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const existingDetails = await User.findOne({ userId });
    if (details.profilePic) {
        const uploadResult = await cloudinary.uploader.upload(details.profilePic, {
            folder: "profile_pics",
            transformation: [{ width: 500, height: 500, crop: "fill" }],
        });
        details.profilePic = uploadResult.secure_url;
    }
    if (existingDetails) {
        console.log("updating existing details");
        existingDetails = { ...existingDetails, ...details };
        await existingDetails.save();
    } else {
        console.log("creating new details");
        const newDetails = new User(details);
        await newDetails.save();
    }

    

    return res.status(201).json({ message: "Detail created successfully" });
};
