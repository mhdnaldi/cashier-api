const helper = require("../helper/helper");

const {
  totalToday,
  totalTodayProfit,
  totalThisWeek,
  totalThisWeekProfit,
  totalThisMonth,
  totalThisMonthProfit,
  recentOrders,
  recentOrdersId,
} = require("../model/history");
const { get } = require("../routes/order");

module.exports = {
  today: async (req, res) => {
    try {
      const total = await totalToday();
      const profit = await totalTodayProfit();
      const pageInfo = {
        total,
        profit,
      };
      return helper.response(res, 200, "SUCCESS", pageInfo);
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  thisWeek: async (req, res) => {
    try {
      const total = await totalThisWeek();
      const profit = await totalThisWeekProfit();
      const pageInfo = {
        total,
        profit,
      };
      return helper.response(res, 200, "SUCCESS", pageInfo);
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  thisMonth: async (req, res) => {
    try {
      const total = await totalThisMonth();
      const profit = await totalThisMonthProfit();
      const pageInfo = {
        total,
        profit,
      };
      return helper.response(res, 200, "SUCCESS", pageInfo);
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  recentOrders: async (req, res) => {
    try {
      const getId = await recentOrdersId();
      const arrOfId = [];
      for (let i = 0; i < getId.length - 1; i++) {
        if (getId[i].history_id === getId[i + 1].history_id) {
          arrOfId.push(getId[i].history_id);
        }
      }
      for (let i = 0; i < arrOfId.length; i++) {
        const orders = await recentOrders(arrOfId[i]);
        console.log(orders);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
