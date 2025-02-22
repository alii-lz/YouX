const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({
            message:
                "User registered successfully, You will be redirected. Please wait",
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.authType = "jwt";
        next();
    } catch (jwtError) {
        return res.status(401).json({ error: "Failed to authenticate token" });
    }
};

module.exports = { authRouter, authMiddleware };
