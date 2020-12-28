const router = require("express").Router();

const {
  postItem,
  updateItem,
  getAllItems,
  getItemById,
  deleteItemById,
} = require("../controller/items");

router.get("/get-items", getAllItems);
router.get("/get-items/:id", getItemById);
router.delete("/delete-items/:id", deleteItemById);
router.post("/", postItem);

module.exports = router;
