import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Happy Birthday!");
});

app.listen(port, () => {
    console.log(`Service listening on localhost:${port}`);
});
