const connection = require("../database/mysql");
const helper = require("../helper/helper");

const {
  totalToday,
  totalTodayProfit,
  totalThisWeek,
  totalThisWeekProfit,
  totalThisMonth,
  totalThisMonthProfit,
} = require("../model/history");

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
};
