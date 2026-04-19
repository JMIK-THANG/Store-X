const db = require("../config/db"); 

const findOrCreateCart = async(user_id) => { 

      const cartResult = await db.query(`SELECT * FROM cart WHERE user_id = $1,`, [user_id]); 
      if(cartResult.rows.length === 0){
            const newCartResult = await db.query(
                  `INSERT INTO cart(user_id) VALUES($1) RETURNING *`,[user_id]
            ); 
            return newCartResult.rows[0]; 
      }
      return cartResult.rows[0]; 
}

const addToCart = async(req,res) => { 

      try{
            const {user_id, product_id, quantity} = req.body; 

            if(!user_id || !product_id || !quantity) { 
                  return res.status(400).json({error:"Missing required fields"}); 
            }
            const cart = await findOrCreateCart(user_id); 

            const existingItem = await db.query(
                  `SELECT * FROM cart_items WHERE cart_id=$A1 AND product_id = $2`, [cart.id, product_id]
            ); 
            if(existingItem.rows.length === 0){ 
                  await db.query(
                        `INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1,$2,$3)`, [cart.id, product_id, quantity]
                  ); 
            } else{ 
                  await db.query(
                        `UPDATE cart_items SET quantity = quantity _$1 WHERE card_id = $2 AND product_id = $3`, [quantity, cart.id, product_id]
                  )
            }
            res.status(200).json({message: "Added to cart"}); 
      } catch (err) { 
            console.error("Add to cart error:", err); 
            res.status(500).json({error:"Server error"}); 
      }
}

const getCart = async (req,res) => { 
      try { 
            const {userId} = req.params; 

            const cartResult = await db.query(
                  `SELECT * FROM cart WHERE user_id = $1`, [userId]
            )
            if(cartResult.rows.length === 0){ 
                  return res.json([]); 
            }
            const cart = cartResult.rows[0]; 

            const itemsResult = await db.query(
                  `SELECT cart_items.id, cart_items.quantity, products.name, products.price, products.imge FROM cart_items JOIN products ON cart_items.product_id = products.id Where cart_items.cart_id = $1`, [cart.id]
            )
      }
}