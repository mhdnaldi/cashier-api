const connection = require("../database/mysql");

module.exports = {
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO history SET ?`, setData, (err, data) => {
        if (!err) {
          const newData = {
            id: data.insertId,
            ...setData,
          };
          resolve(newData);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? WHERE id = ?",
        [setData, id],
        (err, data) => {
          if (!err) {
            const newData = {
              id: id,
              ...setData,
            };
            resolve(newData);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  // RECENT ORDERS
  recentOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE DAY(created_at) = DAY(NOW())`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  // recentOrdersId: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT history_id FROM orders WHERE DAY(created_at) = DAY(NOW())`,
  //       (err, data) => {
  //         !err ? resolve(data) : reject(new Error(err));
  //       }
  //     );
  //   });
  // },
  totalToday: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(sub_total) as total from history WHERE DAY(created_at) = DAY(NOW())`,
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  totalTodayProfit: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(profit) as profit from history WHERE DAY(created_at) = DAY(NOW())`,
        (err, data) => {
          !err ? resolve(data[0].profit) : reject(new Error(err));
        }
      );
    });
  },
  totalThisWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT sum(sub_total) as total from history WHERE WEEK(created_at) = WEEK(NOW())",
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  totalThisWeekProfit: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT sum(profit) as profit from history WHERE WEEK(created_at) = WEEK(NOW())",
        (err, data) => {
          !err ? resolve(data[0].profit) : reject(new Error(err));
        }
      );
    });
  },
  totalThisMonth: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT sum(sub_total) as total from history WHERE MONTH(created_at) = MONTH(NOW())",
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  totalThisMonthProfit: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT sum(profit) as profit from history WHERE MONTH(created_at) = MONTH(NOW())",
        (err, data) => {
          !err ? resolve(data[0].profit) : reject(new Error(err));
        }
      );
    });
  },
};
