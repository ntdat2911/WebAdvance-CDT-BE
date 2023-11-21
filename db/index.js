const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "advancedweb.mysql.database.azure.com",
    port: 3306,
    user: "advancedweb",
    password: "web@1234",
    database: "advanceweb",
  });
  console.log("Database connected!");
})();

module.exports = db;