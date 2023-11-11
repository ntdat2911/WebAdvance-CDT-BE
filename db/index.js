const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "chien401",
    database: "advanced_web",
  });
  console.log("Database connected!");
})();

module.exports = db;