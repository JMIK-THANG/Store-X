import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const result = await db.query(
      `select products.id, products.name, products.price, products.image, categories.name as category from product
       join categories on products.category_id = categories.id `,
    );
    res.json(result.rows); 
  } catch(err) {
      res.json({error:"Server error",err}); 
  }
};

import express from "express";

import {getProducts} from "../controllers/productController.js"
const router = express.Router(); 

router.get('/', getProducts); 