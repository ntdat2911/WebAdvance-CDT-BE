const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-157832-0.cloudclusters.net",
    port: 19915,
    user: "admin",
    password: "XEA5DvMK",
    database: "advanceweb",
    multipleStatements: true
  });
  console.log("Database connected!");
})();

module.exports = db;