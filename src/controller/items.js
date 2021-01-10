const helper = require("../helper/helper");
const {
  getAll,
  post,
  getById,
  deleteById,
  patch,
  search,
  sort,
} = require("../model/items");
module.exports = {
  getAllItems: async (req, res) => {
    try {
      const data = await getAll();
      return helper.response(res, 200, "SUCCESS", data);
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await getById(id);
      return helper.response(res, 200, "SUCCESS", data);
    } catch (err) {
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

      if (item_name === null || item_name === "" || item_name === undefined) {
        return helper.response(res, 400, "NAME CAN'T BE EMPTY");
      } else if (
        item_capital === null ||
        item_capital === "" ||
        item_capital === undefined
      ) {
        return helper.response(res, 400, "CAPITAL CAN'T BE EMPTY");
      } else if (
        item_price === null ||
        item_price === "" ||
        item_price === undefined
      ) {
        return helper.response(res, 400, "PRICE CAN'T BE EMPTY");
      } else if (
        item_category === null ||
        item_category === "" ||
        item_category === undefined
      ) {
        return helper.response(res, 400, "CATEGORY CAN'T BE EMPTY");
      } else {
        const setData = {
          item_name,
          item_capital,
          item_price,
          item_category,
          item_qty,
          created_at: new Date(),
        };
        const result = await post(setData);
        return helper.response(res, 200, "SUCCESS", result);
      }
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  patchItem: async (req, res) => {
    const { id } = req.params;
    const { item_name, item_capital, item_price, item_category } = req.body;
    try {
      const oldData = await getById(id);

      let setData = {
        item_name:
          item_name === null || item_name === undefined || item_name === ""
            ? oldData[0].item_name
            : item_name,
        item_capital:
          item_capital === null ||
          item_capital === undefined ||
          item_capital === ""
            ? oldData[0].item_capital
            : item_capital,
        item_price:
          item_price === null || item_price === undefined || item_price === ""
            ? oldData[0].item_price
            : item_price,
        item_category:
          item_category === null ||
          item_category === undefined ||
          item_category === ""
            ? oldData[0].item_category
            : item_category,
        updated_at: new Date(),
      };

      await patch(setData, id);
      return helper.response(res, 200, "SUCCESS EDIT ITEM");
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  deleteItemById: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteById(id);
      return helper.response(res, 200, "ITEM DELETED");
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  searchItems: async (req, res) => {
    try {
      let { name } = req.query;
      const result = await search(name);
      return helper.response(res, 200, "SUCCESS", result);
    } catch (err) {
      console.log(err);
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
  sortItems: async (req, res) => {
    try {
      const { category } = req.query;
      const result = await sort(category);
      return helper.response(res, 200, "SUCCESS", result);
    } catch (err) {
      return helper.response(res, 400, "BAD REQUEST", err);
    }
  },
};
