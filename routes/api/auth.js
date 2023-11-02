const express = require("express");
const { authenticate, validateBody, upload } = require("../../middlewares");
const {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../../schemas");
const {
  register,
  login,
  getCurrent,
  logout,
  verifyEmail,
  resendVerifyEmail,
  updateSubscription,
  updateAvatar,
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

router.patch(
  "/users",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
