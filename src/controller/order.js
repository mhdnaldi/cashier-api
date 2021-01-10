const helper = require("../helper/helper");
const { getById } = require("../model/items");
const {
  orderById,
  allOrders,
  postOrder,
  sumTotal,
  sumCapital,
} = require("../model/order");

const { postHistory, patchHistory } = require("../model/history");

module.exports = {
  postOrder: async (req, res) => {
    try {
      let price, itemName, category, capital;
      let invoice = Math.floor(1000 + Math.random() * 10000);

      const setDataHistory = {
        invoice: invoice,
        sub_total: 0,
        profit: 0,
        created_at: new Date(),
      };

      let historyId = await postHistory(setDataHistory);
      historyId = historyId.id;

      let orders = req.body;
      orders = orders.map(async (el) => {
        const item = await getById(el.id);
        price = item[0].item_price;
        itemName = item[0].item_name;
        category = item[0].item_category;
        capital = item[0].item_capital;
        const setData = {
          history_id: historyId,
          item_id: el.id,
          item_name: itemName,
          item_qty: el.qty,
          item_category: category,
          total_price: price * el.qty,
          total_capital: capital * el.qty,
          created_at: new Date(),
        };
        await postOrder(setData);
        const subTotal = await sumTotal(historyId);
        const subCapital = await sumCapital(historyId);

        let updatedHistory = {
          invoice: invoice,
          sub_total: subTotal[0].total,
          profit: subTotal[0].total - subCapital[0].total,
          updated_at: new Date(),
        };

        await patchHistory(updatedHistory, historyId);
      });
      return helper.response(res, 200, "SUCCESS");
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
