const helper = require("../helper/helper");
const { getById } = require("../model/items");
const { orderById, allOrders, post } = require("../model/order");

module.exports = {
  postOrder: async (req, res) => {
    try {
      const invoice = Math.floor(10000 + Math.random * 10000);
      let orders = req.body;
      orders = orders.map(async (el) => {
        let price = 0;
        let itemName = "";
        let category = "";
        const item = await getById(el.id);
        price = item[0].item_price;
        itemName = item[0].item_name;
        category = item[0].item_category;
        const setData = {
          invoice: invoice,
          item_id: el.id,
          item_name: itemName,
          item_qty: el.qty,
          item_category: category,
          total_price: price * el.qty,
          created_at: new Date(),
        };
        await post(setData);
        return helper.response(res, 200, "SUCCESS");
      });
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
