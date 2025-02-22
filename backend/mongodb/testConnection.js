const mongoose = require("mongoose");
const { TEST_MONGODB_CONNECTION } = require("../config.js");

let isConnected = false;

const connectToTestDB = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            const conn = await mongoose.connect(TEST_MONGODB_CONNECTION);
            if (!conn.connection.db.databaseName.includes("Test")) {
                throw new Error("We have connected to wrong DB!");
            }
            console.log(
                `TEST MongoDB connected to database: ${conn.connection.db.databaseName}`
            );
            isConnected = true;
        } catch (error) {
            console.error("TEST MongoDB connection error:", error.message);
            process.exit(1);
        }
    } else {
        console.log("Using existing database connection");
    }
};

const disconnectFromTestDB = async () => {
    if (isConnected) {
        // so we only drop DB if we're connected to the test DB
        if (mongoose.connection.db.databaseName.includes("Test")) {
            await mongoose.connection.dropDatabase();
        }
        await mongoose.connection.close();
        isConnected = false;
    }
};

module.exports = { connectToTestDB, disconnectFromTestDB };
