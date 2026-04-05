const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
  const result = await db.query(`
  SELECT
    p.id,
    p.name,
    p.description,
    p.price,
    p.category_id,
    p.stock,
    p.created_at,
    COALESCE(
      JSON_AGG(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
      '[]'
    ) AS images
  FROM products p
  LEFT JOIN product_images pi
    ON p.id = pi.product_id
  GROUP BY p.id;
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
