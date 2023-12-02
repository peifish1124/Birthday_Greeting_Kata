import dotenv from "dotenv";
import express from "express";

import MessageRoute from "./Routes/MessageRoute.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Happy Birthday!");
});

app.use("/api", MessageRoute);

app.listen(port, () => {
    console.log(`Service listening on localhost:${port}`);
});
