const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use('/products', productsRoutes)

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});