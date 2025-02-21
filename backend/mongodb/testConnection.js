import mongoose from "mongoose";
import { MONGODB_CONNECTION } from "../config.js";

let isConnected = false;

export const connectToTestDB = async () => {
    if (!isConnected) {
        await mongoose.connect(MONGODB_CONNECTION);
        isConnected = true;
    }
};

export const disconnectFromTestDB = async () => {
    if (isConnected) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        isConnected = false;
    }
};
