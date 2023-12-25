const mysql = require("mysql2/promise");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-158954-0.cloudclusters.net",
    port: 10026,
    user: "admin",
    password: "1JjcGXfi",
    database: "advanceweb",
    multipleStatements: true
  });
  console.log("Database connected!");
})();

module.exports = db;