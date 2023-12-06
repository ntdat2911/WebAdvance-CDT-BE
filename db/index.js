const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-156900-0.cloudclusters.net",
    port: 15869,
    user: "admin",
    password: "NTa7k2Gc",
    database: "advanceweb",
  });
  console.log("Database connected!");
})();

module.exports = db;