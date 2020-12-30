const router = require("express").Router();

const orders = require("./routes/order");
const items = require("./routes/items");

router.use("/items", items);
router.use("/orders", orders);

module.exports = router;
