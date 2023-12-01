const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DBPASSWORD,
  database: "dbmsproject",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectToDatabase = async () => {
  const connection = await db.promise().getConnection();
  try {
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } finally {
    connection.release();
  }
};

db.on("error", (err) => {
  console.error("MySQL Pool Error:", err);
});

// Handle process exit
process.on("exit", () => {
  db.end(); // Close all connections when the process exits
});

connectToDatabase();

module.exports = db;
