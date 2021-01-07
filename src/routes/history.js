const route = require("express").Router();
const { today, thisWeek, thisMonth } = require("../controller/history");
route.get("/today", today);
route.get("/this-week", thisWeek);
route.get("/this-month", thisMonth);

module.exports = route;
