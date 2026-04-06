const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        name,
        description,
        price,
        category_id,
        stock,
        created_at,
        image_url
      FROM products
      ORDER BY id ASC;
    `);

    res.json({
      message: "Products fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching products",
      error: err.message,
    });
  }
});

module.exports = router;