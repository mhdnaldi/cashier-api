const router = require("express").Router();

const {
  postItem,
  updateItem,
  getAllItems,
  getItemById,
  deleteItemById,
  patchItem,
  searchItems,
  sortItems,
} = require("../controller/items");

router.get("/get-items", getAllItems);
router.get("/search-items", searchItems);
router.get("/sort-items", sortItems);
router.get("/get-items/:id", getItemById);
router.delete("/delete-items/:id", deleteItemById);
router.post("/", postItem);
router.patch("/:id", patchItem);

module.exports = router;
