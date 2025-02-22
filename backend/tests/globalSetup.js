const { connectToTestDB } = require("../mongodb/testConnection.js");

module.exports = async () => {
    await connectToTestDB();
};
