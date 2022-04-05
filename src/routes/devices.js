const express = require("express");
const router = express.Router();
const mySql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query("SELECT * FROM devices", (error, result, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.status(200).send({
        data: result,
      });
    });
  });
});

router.get("/:deviceId", (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "SELECT * FROM devices WHERE id = ?",
      [req.params.deviceId],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(200).send({
          data: result,
        });
      }
    );
  });
});

router.post("/", (req, res, next) => {
  const newDevice = {
    categoryId: req.body.categoryId,
    color: req.body.color,
    partNumber: req.body.partNumber,
  };

  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "INSERT INTO devices(color, partNumber, categories_id) VALUES(?, ?, ?)",
      [req.body.color, req.body.partNumber, req.body.categories_id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(201).send({
          message: "Device created",
          data: {
            id: result.insertId,
          },
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
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "UPDATE devices SET color = ?, partNumber = ?, categories_id = ? WHERE id = ?",
      [
        req.body.color,
        req.body.partNumber,
        req.body.categories_id,
        req.params.deviceId,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(202).send({
          message: "Device successfully updated",
        });
      }
    );
  });
});

router.delete("/:deviceId", (req, res, next) => {
  res.status(200).send({
    message: "delete device",
  });
});

module.exports = router;
