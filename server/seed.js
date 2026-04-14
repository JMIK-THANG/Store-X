import fetch from 'node-fetch'
import db from './config/db'; 

export async function seedToDb() { 
      try { 
            // fetch data
            console.log("Fetching Products..."); 
            const result = await fetch ("https://fakestoreapi.com/products"); 
            const products = await result.json(); 

            // step 1... extract category
            console.log("Extracting categories...."); 
            const categories = [...new Set(products.map((item) => item.category))]; 

            console.log("Inserting categories......"); 

            const categorymap = {}; 

            for(let catname of categories) { 
                  const result = await db.query(`INSERT INTO public.categories(name) VALUES($1) returning id`,
                 [catname]); 
                  categorymap[catname] = result.rows[0].id; 
            }
      // Inderting products.....

      for(let p of products){
            const result = await db.query(`INSERT INTO public.products(name,description, price,image, category_id)
                            VALUES($1,$2,$3,$4,$5)`,[p.title,p.description, p.price, p.image,categorymap[p.category]])
      }
      }
      catch(err){ 
            console.error("error...",err); 
      }
}