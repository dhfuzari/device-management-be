const mySql = require("../mysql");

exports.getDevices = async (req, res, next) => {
  try {
    const result = await mySql.execute(
      `SELECT 
        devices.id,  
        devices.color, 
        devices.partNumber, 
        categories.name as category
      FROM devices
      INNER JOIN categories
      ON devices.categories_id = categories.id;`
    );
    return res.status(200).send({
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.getDeviceById = async (req, res, next) => {
  try {
    const result = await mySql.execute("SELECT * FROM devices WHERE id = ?", [
      req.params.deviceId,
    ]);
    return res.status(200).send({
      data: result[0] || {},
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.createDevice = async (req, res, next) => {
  try {
    const currentCategory = await mySql.execute(
      "SELECT * FROM categories WHERE id = ?",
      [req.body.categories_id]
    );
    if (currentCategory.length === 0) {
      return res.status(404).send({
        message: "Category not found",
      });
    } else {
      const query =
        "INSERT INTO devices(color, partNumber, categories_id) VALUES(?, ?, ?)";
      const result = await mySql.execute(query, [
        req.body.color,
        req.body.partNumber,
        req.body.categories_id,
      ]);
      return res.status(201).send({
        data: {
          id: result.insertId,
          partNumber: req.body.partNumber,
          color: req.body.color,
          categories_id: req.body.categories_id,
        },
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.updateDevice = async (req, res, next) => {
  try {
    const result = await mySql.execute(
      "UPDATE devices SET color = ?, partNumber = ?, categories_id = ? WHERE id = ?",
      [
        req.body.color,
        req.body.partNumber,
        req.body.categories_id,
        req.params.deviceId,
      ]
    );
    res.status(202).send({
      message: "Device successfully updated",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.removeDevice = async (req, res, next) => {
  try {
    const result = await mySql.execute("DELETE FROM devices WHERE id = ?", [
      req.params.deviceId,
    ]);
    res.status(202).send({
      message: "Device successfully removed",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
