const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("CONNECTED TO DATABASE");
  }
});

module.exports = connection;
