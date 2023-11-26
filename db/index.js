const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-155584-0.cloudclusters.net",
    port: 17435,
    user: "admin",
    password: "szOyk8rA",
    database: "advanceweb",
  });
  console.log("Database connected!");
})();

module.exports = db;