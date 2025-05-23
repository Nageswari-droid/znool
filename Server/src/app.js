const express = require("express");

const app = express();

app.use(express.json());

app.get(("/"), (_, res) => {
    res.send("App is running!");
});

module.exports = app;
