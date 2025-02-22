const {
    connectToTestDB,
    disconnectFromTestDB,
} = require("../mongodb/testConnection.js");
const { closeServer } = require("../index.js");
const User = require("../models/User.js");
const Application = require("../models/Application.js");

const setupTestDB = () => {
    beforeAll(async () => {
        process.env.NODE_ENV = "test";
        await connectToTestDB();
    });

    afterAll(async () => {
        await disconnectFromTestDB();
        closeServer();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Application.deleteMany({});
    });
};

module.exports = { setupTestDB };
