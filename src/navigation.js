const router = require("express").Router();

const orders = require("./routes/order");
const items = require("./routes/items");
const history = require("./routes/history");

router.use("/items", items);
router.use("/orders", orders);
router.use("/history", history);

module.exports = router;
