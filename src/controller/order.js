const { getById } = require("../model/items");
const { orderById, allOrders, post } = require("../model/order");

module.exports = {
  postOrder: async (req, res) => {
    try {
      const invoice = Math.floor(10000 + Math.random * 10000);
      let orders = req.body;
      orders = order.map(async (value) => {
        let price = 0;
        let itemName = "";
        const item = await getById(value.id);
        price = item[0].item_price;
        itemName = item[0].item_name;
        const setData = {
          invoice: invoice,
          id: value.id,
          item_name: itemName,
          qty: value.qty,
          total: price * value.qty,
          created_at: new Date(),
        };
        await post(setData);
      });
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
