const mySql = require("../mysql").pool;

exports.getCategories = (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query("SELECT * FROM categories", (error, result, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.status(200).send({
        data: result,
      });
    });
  });
};

exports.getCategoriesById = (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.categoryId],
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

exports.createCategory = (req, res, next) => {
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
      "INSERT INTO categories(name) VALUES(?)",
      [req.body.name],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(201).send({
          message: "Category created",
          data: {
            id: result.insertId,
          },
        });
      }
    );
  });
};

exports.updateCategory = (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [req.body.name, req.params.categoryId],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(202).send({
          message: "Category successfully updated",
        });
      }
    );
  });
};

exports.removeCategory = (req, res, next) => {
  mySql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    conn.query(
      "DELETE FROM categories WHERE id = ?",
      [req.params.categoryId],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        res.status(202).send({
          message: "Category successfully removed",
        });
      }
    );
  });
};
