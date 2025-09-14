import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import detailRouter from "./routes/detail.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
    connectDB();
});

app.use("/api/auth", authRoute);
app.use('/api/details',detailRouter);
