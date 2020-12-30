const connection = require("../database/mysql");

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM items`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM items WHERE id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM items WHERE id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  post: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO items SET ?`, setData, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  patch: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE items SET ? WHERE id = ${id}`,
        setData,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
};
