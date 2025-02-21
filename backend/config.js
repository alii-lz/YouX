import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

export const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
export const JWT_SECRET = process.env.JWT_SECRET;
