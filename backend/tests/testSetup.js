import {
    connectToTestDB,
    disconnectFromTestDB,
} from "../mongodb/testConnection.js";
import { closeServer } from "../index.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

const setupTestDB = () => {
    beforeAll(async () => {
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

export { setupTestDB };
