const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.getCategories);
router.get("/:categoryId", categoriesController.getCategoriesById);
router.post("/", categoriesController.createCategory);
router.patch("/:categoryId", categoriesController.updateCategory);
router.delete("/:categoryId", categoriesController.removeCategory);

module.exports = router;
