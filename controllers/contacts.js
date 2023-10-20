const Joi = require("joi");
const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../utils");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const result = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "_id email");

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (result === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  res.status(200).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (result === null) throw HttpError(404, "Not found");

  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateSchema.validate(req.body);

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");
  if (error) throw HttpError(400, error.message);

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result === null) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
