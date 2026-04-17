const db = require("./config/db");

async function seedToDb() {
  try {
    console.log("Fetching products...");
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    console.log("Extracting categories...");
    const categoryMap = new Map();

    for (const product of products) {
      if (!categoryMap.has(product.category)) {
        const categoryResult = await db.query(
          "INSERT INTO categories (name) VALUES ($1) RETURNING id",
          [product.category]
        );
        categoryMap.set(product.category, categoryResult.rows[0].id);
      }
    }

    console.log("Inserting products...");
    for (const product of products) {
      await db.query(
        `
        INSERT INTO products (title, price, description, image, category_id)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          product.title,
          product.price,
          product.description,
          product.image,
          categoryMap.get(product.category),
        ]
      );
    }

    console.log("Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

seedToDb();