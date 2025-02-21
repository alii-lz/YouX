export default {
    transform: {},
    testEnvironment: "node",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    testMatch: ["**/*.test.js"],
    verbose: true,
    globalSetup: "./tests/globalSetup.js",
    globalTeardown: "./tests/globalTeardown.js",
};
