const express = require("express");
const { authenticate } = require("../../middlewares");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/users", authenticate, updateSubscription);

module.exports = router;
