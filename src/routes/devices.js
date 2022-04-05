const express = require("express");
const router = express.Router();
const mySql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      `SELECT 
        devices.id,  
        devices.color, 
        devices.partNumber, 
        categories.name as category
      FROM devices
      INNER JOIN categories
      ON devices.categories_id = categories.id;`,
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
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "SELECT * FROM categories WHERE id = ?",
      [req.body.categories_id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Category not found",
          });
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
      }
    );
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
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "DELETE FROM devices WHERE id = ?",
      [req.params.deviceId],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(202).send({
          message: "Device successfully removed",
        });
      }
    );
  });
});

module.exports = router;
