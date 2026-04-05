const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories");

    res.json({
      message: "Categories fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching categories",
      error: err.message,
    });
  }
});

// POST create category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await db.query(
      "INSERT INTO categories(name) VALUES($1) RETURNING *",
      [name]
    );

    res.json({
      message: "Category created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating category",
      error: err.message,
    });
  }
});

module.exports = router;