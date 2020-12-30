const connection = require("../database/mysql");

module.exports = {
  orderById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM orders WHERE id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  allOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM orders`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  post: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO orders SET ?`, setData, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
};
