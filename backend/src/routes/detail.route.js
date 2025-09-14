import { Router } from "express";
import User from "../models/user.model.js";

const detailRouter = new Router();

detailRouter.post("/", (req, res) => {
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

    res.status(201).json({ message: "Detail created successfully" });
});

export default detailRouter;
