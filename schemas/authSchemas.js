const Joi = require("joi");
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};
