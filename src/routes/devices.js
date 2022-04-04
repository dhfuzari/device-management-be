const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "get all devices",
  });
});

router.get("/:deviceId", (req, res, next) => {
  res.status(200).send({
    message: "get a device by id",
  });
});

router.post("/", (req, res, next) => {
  const newDevice = {
    categoryId: req.body.categoryId,
    color: req.body.color,
    partNumber: req.body.partNumber,
  };
  res.status(201).send({
    message: "create a device",
    data: newDevice,
  });
});

router.put("/:deviceId", (req, res, next) => {
  res.status(200).send({
    message: "complete device update",
  });
});

router.patch("/:deviceId", (req, res, next) => {
  res.status(200).send({
    message: "partial device update",
  });
});

router.delete("/:deviceId", (req, res, next) => {
  res.status(200).send({
    message: "delete device",
  });
});

module.exports = router;
