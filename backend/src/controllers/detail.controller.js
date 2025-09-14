import Detail from "../models/detail.model.js";

export const saveDetails = async (req, res) => {
    const details = req.body;
    const userKeys = Object.keys(Detail.schema.paths).filter(
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

    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let existingDetails = await Detail.findOne({ userId });
    if (existingDetails) {
        console.log("updating existing details");
        existingDetails = { ...existingDetails, ...details };
        await Detail.updateOne({ userId }, { $set: details });
    } else {
        console.log("creating new details");
        const newDetails = new Detail({ userId, ...details });
        await newDetails.save();
    }

    return res
        .status(201)
        .json({
            message: `Details ${
                existingDetails ? "updated" : "created"
            } successfully`,
        });
};

export const getDetails = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const userDetails = await Detail.findOne({ userId });
        if (!userDetails) {
            return res.status(404).json({ message: "User details not found" });
        }
        return res.status(200).json(userDetails);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
