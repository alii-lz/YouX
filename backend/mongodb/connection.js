import mongoose from "mongoose";
import { MONGODB_CONNECTION } from "../config.js";

const connectMongoDB = async () => {
    if (!MONGODB_CONNECTION) {
        console.error(
            "MongoDB connection string is undefined. It's probably an issue with the .env file."
        );
        return;
    }

    try {
        await mongoose.connect(MONGODB_CONNECTION, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connection success!!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectMongoDB;
