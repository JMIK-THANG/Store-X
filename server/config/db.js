import pg from "pg";
import "dotenv/config";

const { Client } = pg;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

db.connect()
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Connection error:", err));
console.log("DATABASE_URL:", process.env.DATABASE_URL);
export default db;