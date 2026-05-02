import express from "express";
import cors from "cors";
import db from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// =========================
// Endpoints
// =========================

// GET users
app.get("/getusers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");

    res.json({
      message: "Successful",
      data: result.rows,
    });
  } catch (err) {
    res.json({ error: "Server Error" });
  }
});

// POST users
app.post("/saveusers", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await db.query(
      `INSERT INTO users(name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, password]
    );

    res.json({
      message: "Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.json({ error: "Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Welcome to Express at Port ${PORT}`);
});