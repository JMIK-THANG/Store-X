import db from "../config/db.js";

const createOrderController = async (req, res) => {
  try {
    const {
      user_id,
      address_line,
      city,
      state,
      country,
      zip_code,
      payment_method,
    } = req.body;

    const cart = await db.query(`SELECT * FROM cart WHERE user_id = $1`, [
      user_id,
    ]);

    if (cart.rows.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartId = cart.rows[0].id;

    const cartItems = await db.query(
      `SELECT 
        ci.product_id,
        ci.quantity,
        p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = $1`,
      [cartId],
    );

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let total_amount = 0;

    for (const item of cartItems.rows) {
      total_amount += Number(item.price) * Number(item.quantity);
    }

    const order = await db.query(
      `INSERT INTO orders(
        user_id,
        total_amount,
        address_line,
        city,
        state,
        country,
        zip_code,
        payment_method
      ) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
      RETURNING *`,
      [
        user_id,
        total_amount,
        address_line,
        city,
        state,
        country,
        zip_code,
        payment_method,
      ],
    );

    for (const item of cartItems.rows) {
      await db.query(
        `INSERT INTO order_items(
          order_id,
          product_id,
          quantity,
          price
        ) 
        VALUES ($1,$2,$3,$4)`,
        [order.rows[0].id, item.product_id, item.quantity, item.price],
      );
    }

    const deletedItems = await db.query(
      `DELETE FROM cart_items 
       WHERE cart_id = $1
       RETURNING *`,
      [cartId],
    );

    res.status(201).json({
      message: "Order Created Successfully",
      order_id: order.rows[0].id,
      deleted_cart_items: deletedItems.rows.length,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export default createOrderController;
