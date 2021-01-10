const route = require("express").Router();
const {
  today,
  thisWeek,
  thisMonth,
  recentOrders,
} = require("../controller/history");
route.get("/today", today);
route.get("/this-week", thisWeek);
route.get("/this-month", thisMonth);
route.get("/recent-orders", recentOrders);

module.exports = route;
