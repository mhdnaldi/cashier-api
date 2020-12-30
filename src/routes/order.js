const router = require("express").Router();

const { postOrder } = require("../controller/order");

router.post("/post-order", postOrder);

module.exports = router;
