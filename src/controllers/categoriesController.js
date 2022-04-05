const mySql = require("../mysql");

exports.getCategories = async (req, res, next) => {
  try {
    const result = await mySql.execute("SELECT * FROM categories");
    return res.status(200).send({
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.getCategoriesById = async (req, res, next) => {
  try {
    const query = "SELECT * FROM categories WHERE id = ?";
    const result = await mySql.execute(query, [req.params.categoryId]);
    return res.status(200).send({
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const query = "INSERT INTO categories(name) VALUES(?)";
    const result = await mySql.execute(query, [req.body.name]);
    return res.status(201).send({
      message: "Category created",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const currentCategory = await mySql.execute(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.categoryId]
    );
    if (currentCategory.length === 0) {
      return res.status(404).send({
        message: "Category not found",
      });
    } else {
      const query = "UPDATE categories SET name = ? WHERE id = ?";
      const result = await mySql.execute(query, [
        req.body.name,
        req.params.categoryId,
      ]);
      return res.status(202).send({
        message: "Category successfully updated",
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.removeCategory = async (req, res, next) => {
  try {
    const currentCategory = await mySql.execute(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.categoryId]
    );
    if (currentCategory.length === 0) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    const deviceCategory = await mySql.execute(
      "SELECT * FROM devices WHERE categories_id = ?",
      [req.params.categoryId]
    );
    if (deviceCategory.length >= 1) {
      return res.status(404).send({
        message: "You can't remove this category. There are devices using it",
      });
    }

    const query = "DELETE FROM categories WHERE id = ?";
    const result = await mySql.execute(query, [req.params.categoryId]);
    res.status(202).send({
      message: "Category successfully removed",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
