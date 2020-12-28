const router = require("express").Router();

const items = require("./routes/items");

router.use("/items", items);

module.exports = router;
