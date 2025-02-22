const express = require("express");
const cors = require("cors");
const connectToMongo = require("./mongodb/connection");
const { authRouter } = require("./routes/authRoutes");
const applicationRouter = require("./routes/applicationRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const serverless = require("serverless-http");

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
connectToMongo();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/application", applicationRouter);

let server;
if (process.env.NODE_ENV !== "production") {
    const port = 3001;
    server = app.listen(port, () => {
        console.log(`Backend running at http://localhost:${port}`);
    });
}

const closeServer = () => {
    if (server) {
        server.close();
    }
};

const handler = serverless(app);

module.exports = { handler, app, closeServer };
