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

// Get all applications
applicationRouter.get("/all", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.userId });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Fetches a specific application
applicationRouter.get("/get/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update an application
applicationRouter.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const updatedApplication = await Application.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!updatedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete an application
applicationRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const deletedApplication = await Application.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!deletedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default applicationRouter;
