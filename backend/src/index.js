import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import detailRouter from "./routes/detail.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/details", detailRouter);
