import express from "express";
import cors from "cors";
import connectToMongo from "./mongodb/connection.js";
import { authRouter } from "./routes/authRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

export const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// MongoDB connection
connectToMongo();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Testing");
});

app.use("/auth", authRouter);
app.use("/application", applicationRouter);

const server = app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});

export const closeServer = () => {
    server.close();
};
