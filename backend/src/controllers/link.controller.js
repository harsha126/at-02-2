import Link from "../models/links.model.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find().select("-__v");
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: "Error fetching links" });
    }
};

export const saveLink = async (req, res) => {
    try {
        const { name, link, location } = req.body;
        if (!name || !link || !location) {
            return res
                .status(400)
                .json({ message: "name, link, and location are required" });
        }
        const newLink = new Link(req.body);
        await newLink.save();
        res.status(201).json({
            name: newLink.name,
            link: newLink.link,
            location: newLink.location,
            _id: newLink._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving link" });
    }
};
