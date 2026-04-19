import pg from "pg";

const { Client } = pg;

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "e-commerce",
  password: "jmik12345",
  port: 5432,
};

const db = new Client(dbConfig);

db.connect()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

export default db;