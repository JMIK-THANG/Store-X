import db from "../config/db.js";

const createOrderController = async (req, res) => {
  try {
    // Step 1: Fetch data from frontend/Postman
    const {
      user_id,
      address_line,
      city,
      state,
      country,
      zip_code,
      payment_method,
    } = req.body;

    // Step 2: Check whether user has a cart
    const cart = await db.query(
      `SELECT * FROM cart WHERE user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return res.json({ error: "Cart not found" });
    }

    // Step 3: Calculate total price of order
    const cartItems = await db.query(
      `SELECT p.price, ci.quantity 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1`,
      [cart.rows[0].id]
    );

    let total_amount = 0;

    for (const item of cartItems.rows) {
      total_amount += item.price * item.quantity;
    }

    // Step 4: Create order
    const order = await db.query(
      `INSERT INTO orders(
        user_id,
        address_line,
        city,
        state,
        country,
        zip_code,
        payment_method,
        total_amound
      ) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
      RETURNING *`,
      [
        user_id,
        address_line,
        city,
        state,
        country,
        zip_code,
        payment_method,
        total_amount,
      ]
    );

    // Step 5: Insert order items
    for (const item of cartItems.rows) {
      await db.query(
        `INSERT INTO order_items(
          order_id,
          product_id,
          quantity,
          price
        ) 
        VALUES ($1,$2,$3,$4)`,
        [
          order.rows[0].id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );
    }

    // Step 6: Clear cart
    await db.query(
      `DELETE FROM cart_items WHERE cart_id = $1`,
      [cart.rows[0].id]
    );

    // Step 7: Send response to frontend
    res.json({
      message: "Order Created Successfully",
      order_id: order.rows[0].id,
    });
  } catch (err) {
    res.json({ error: "Server Error" });
  }
};

export default createOrderController;