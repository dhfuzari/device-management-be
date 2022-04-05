const express = require("express");
const router = express.Router();
const mySql = require("../mysql").pool;

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

  mySql.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO devices(color, partNumber, categories_id) VALUES(?, ?, ?)",
      [req.body.color, req.body.partNumber, req.body.categories_id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error.message,
          });
        }
        res.status(201).send({
          message: "Device created",
          id: result.insertId,
        });
      }
    );
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
