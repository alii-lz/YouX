const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        email: String,
        income: Number,
        expenses: Number,
        assets: { type: [String], default: [] },
        liabilities: { type: [String], default: [] },
    },
    { collection: "Applications" }
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
