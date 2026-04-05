app.post("/categories", async(req,res) => { 
      try{ 
            const { name} = req.body; 

            const result = await db.query(
                  "INSERT INTO categories(name) VALUES($1) RETURNING *",
                  [name]
            ); 
            res.json({ 
                  message:"Category created successfully",
                  data:result.rows[0],
            }); 
      } catch (err){
            res.status(500).json({
                  message:"Error creating category",
                  error:err.message,
            })
      }
})