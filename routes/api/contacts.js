const express = require("express");
const { isValidId } = require("../../middlewares");
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", add);

router.delete("/:contactId", isValidId, deleteById);

router.put("/:contactId", isValidId, updateById);

router.patch("/:contactId/favorite", isValidId, updateFavorite);

module.exports = router;
