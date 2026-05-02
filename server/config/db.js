import pg from "pg";
import "dotenv/config";

const { Client } = pg;

const isRender = process.env.RENDER === "true";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: isRender ? { rejectUnauthorized: false } : false,
});

db.connect()
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Connection error:", err));

export default db;