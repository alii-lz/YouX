const mongoose = require("mongoose");
const {
    MONGODB_CONNECTION,
    TEST_MONGODB_CONNECTION,
    NODE_ENV,
} = require("../config");

const connectMongoDB = async () => {
    const connectionString =
        NODE_ENV === "test" ? TEST_MONGODB_CONNECTION : MONGODB_CONNECTION;

    if (!connectionString) {
        console.error(
            "MongoDB connection string is undefined. It's probably an issue with the .env file."
        );
        return;
    }

    try {
        const conn = await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(
            `MongoDB connected to database: ${conn.connection.db.databaseName}`
        );
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

module.exports = connectMongoDB;
