const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const healthCheckRoute = require("./routes/healthCheck");
const deviceRoute = require("./routes/devices");
const categoryRoute = require("./routes/categories");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // TODO: Set the production front-end server
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

app.use("/", healthCheckRoute);
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
