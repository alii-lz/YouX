import mongoose from "mongoose";

const connectMongoDB = async () => {
    if (!process.env.MONGODB_CONNECTION) {
        console.error(
            "MongoDB connection string is undefined its probably an issue with .env file"
        );
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connection success!!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectMongoDB;
