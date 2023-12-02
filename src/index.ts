import express from "express";

import MessageRoute from "./Routes/MessageRoute.js";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Happy Birthday!");
});

app.use("/api", MessageRoute);

app.listen(port, () => {
    console.log(`Service listening on localhost:${port}`);
});