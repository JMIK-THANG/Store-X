const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");

    res.json({
      message: "Users fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
});

router.post("/", async (req,res)=> { 
      try{ 
            const {name, email, password} = req.body; 

            const result = await db.query (
                  "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
                  [name, email, password]
            ); 

            res.json({
                  message: "User created successfully",
                  data:result.rows[0],
            }); 
      } catch (err) { 
            res.status(500).json({
                  message:"Error creating user",
                  error:err.message,
            })
      }
})