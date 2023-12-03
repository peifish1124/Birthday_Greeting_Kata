import dotenv from "dotenv";
import express from "express";

import MessageRoute from "./Routes/MessageRoute.js";

dotenv.config();

const app = express();

app.get("/", function (req, res) {
    res.send("Happy Birthday!");
});

app.use("/api", MessageRoute);

export default app;
