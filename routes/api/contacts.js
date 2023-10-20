const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, add);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.put("/:contactId", authenticate, isValidId, updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, updateFavorite);

module.exports = router;
