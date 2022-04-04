const express = require("express");
const app = express();

const deviceRoute = require("./routes/devices");
const categoryRoute = require("./routes/categories");

app.use("/devices", deviceRoute);
app.use("/categories", categoryRoute);

app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
