import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const result = await db.query(
      `select products.id, products.name, products.price, products.image, categories.name as caterory form product join categories on products.category_id = categories.id`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error("error ....", err);
    res.json({ error: "Server error" });
  }
};
