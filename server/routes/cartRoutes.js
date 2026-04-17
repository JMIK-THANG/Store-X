const express = require("express");
const router = express.Router();

const { addToCart, getCart } = require("../controllers/cart");

router.post("/add", addToCart);
router.get("/:userId", getCart);

module.exports = router;