import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToMongo from "./mongodb/connection.js";
import { authRouter } from "./routes/authRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// MongoDB connection
connectToMongo();

app.get("/", (req, res) => {
    res.send("Testing");
});

app.use("/auth", authRouter);
app.use("/application", applicationRouter);

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
