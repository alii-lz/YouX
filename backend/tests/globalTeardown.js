const { disconnectFromTestDB } = require("../mongodb/testConnection.js");

module.exports = async () => {
    await disconnectFromTestDB();
};
