import { connectToTestDB } from "../mongodb/testConnection.js";

export default async () => {
    await connectToTestDB();
};
