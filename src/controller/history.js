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

const { orderById } = require("../model/order");
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
      // UNSOLVED YET
      // const getId = await recentOrdersId();
      // const arrOfId = getId.map((el) => el.history_id);
      // let id = [...new Set(arrOfId)];
      // let arr = [];
      // for (let i = 0; i < id.length; i++) {
      //   arr.push(await recentOrders(id[i]));
      // }

      const result = await recentOrders();

      return helper.response(res, 200, "SUCCESS", result);
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
