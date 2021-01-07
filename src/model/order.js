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
  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO orders SET ?`, setData, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  sumTotal: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(total_price) as total FROM orders WHERE history_id =${id}`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  sumCapital: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(total_capital) as total FROM orders WHERE history_id =${id}`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
};
