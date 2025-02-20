const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
    res.send("Testing");
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
