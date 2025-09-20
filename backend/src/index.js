import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import detailRouter from "./routes/detail.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import linkRouter from "./routes/link.route.js";

dotenv.config();

const port = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/details", detailRouter);
app.use("/api/links", linkRouter);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/:any", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
