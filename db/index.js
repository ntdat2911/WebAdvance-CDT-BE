const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "admin",
    password: process.env.DB_PASSWORD,
    database: "advanceweb",
    multipleStatements: true,
  });
  console.log("Database connected!");
})();

module.exports = db;
