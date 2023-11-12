const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-154148-0.cloudclusters.net",
    port: 18702,
    user: "admin",
    password: "vQTZYNiT",
    database: "advanceweb",
  });
  console.log("Database connected!");
})();

module.exports = db;