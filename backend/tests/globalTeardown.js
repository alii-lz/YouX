import { disconnectFromTestDB } from "../mongodb/testConnection.js";

export default async () => {
    await disconnectFromTestDB();
};
