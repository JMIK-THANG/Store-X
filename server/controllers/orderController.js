import express from "express"; 
const router = express.Router(); 
import createOrderController from "../controllers/orderController.js"; 

router.post("/addOrder", createOrderController); 

export default router; 