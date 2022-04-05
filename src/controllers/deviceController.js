const mySql = require("../mysql").pool;

exports.getDevices = (req, res, next) => {
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
};

exports.getDeviceById = (req, res, next) => {
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
};

exports.createDevice = (req, res, next) => {
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
};

exports.updateDevice = (req, res, next) => {
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
};

exports.removeDevice = (req, res, next) => {
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
};
