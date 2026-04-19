import db from "../config/db.js";

const getProducts = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        products.id, 
        products.name, 
        products.price, 
        products.image,
        categories.name AS category
       FROM products
       JOIN categories
       ON products.category_id = categories.id`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("error....", err);
    res.status(500).json({ error: "Server error" });
  }
};

export { getProducts };