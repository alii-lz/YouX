const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const TEST_MONGODB_CONNECTION = process.env.TEST_MONGODB_CONNECTION;

module.exports = {
    MONGODB_CONNECTION,
    JWT_SECRET,
    NODE_ENV,
    TEST_MONGODB_CONNECTION,
};
