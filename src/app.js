const express = require("express");
const app = express();

const deviceRoute = require("./routes/devices");

app.use("/devices", deviceRoute);

module.exports = app;
