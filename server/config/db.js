import pg from "pg";
import "dotenv/config";

const { Client } = pg;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

db.connect()
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Connection error:", err));

export default db;
