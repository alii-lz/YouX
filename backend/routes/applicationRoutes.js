import express from "express";
import Application from "../models/Application.js";
import { authMiddleware } from "./authRoutes.js";

const applicationRouter = express.Router();

// Create an application
applicationRouter.post("/create", authMiddleware, async (req, res) => {
    console.log("called");
    const { username, email, income, expenses, assets, liabilities } = req.body;
    try {
        const application = new Application({
            userId: req.userId,
            username,
            email,
            income,
            expenses,
            assets,
            liabilities,
        });

        const savedApp = await application.save();

        // to remove unwanted Mongoose fields
        const appDataObj = savedApp.toObject();

        res.status(201).json(appDataObj);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default applicationRouter;
