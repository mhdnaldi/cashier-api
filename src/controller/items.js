const helper = require("../helper/helper");
const { getAll, post, getById, deleteById } = require("../model/items");
module.exports = {
  getAllItems: async (req, res) => {
    try {
      const data = await getAll();
      return helper.response(res, 200, "SUCCESS", data);
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await getById(id);
      console.log(data);
      return helper.response(res, 200, "SUCCESS", data);
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  postItem: async (req, res) => {
    try {
      const {
        item_name,
        item_capital,
        item_price,
        item_category,
        item_qty,
      } = req.body;

      const setData = {
        item_name,
        item_capital,
        item_price,
        item_category,
        item_qty,
        created_at: new Date(),
      };
      await post(setData);
      return helper.response(res, 200, "SUCCESS");
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  updateItem: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  deleteItemById: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteById(id);
      return helper.response(res, 200, "ITEM DELETED");
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
