const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "get all categories",
  });
});

router.get("/:categoryId", (req, res, next) => {
  res.status(200).send({
    message: "get a category by id",
  });
});

router.post("/", (req, res, next) => {
  const newCategory = {
    name: req.body.name,
  };
  res.status(201).send({
    message: "creat a category",
    data: newCategory,
  });
});

router.put("/:categoryId", (req, res, next) => {
  res.status(200).send({
    message: "complete category update",
  });
});

router.patch("/:categoryId", (req, res, next) => {
  res.status(200).send({
    message: "partial category update",
  });
});

router.delete("/:categoryId", (req, res, next) => {
  res.status(200).send({
    message: "delete category",
  });
});

module.exports = router;
