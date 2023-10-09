const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError } = require("../utils");
const { ctrlWrapper } = require("../utils");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();

  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (contact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  const newContact = await contacts.addContact(req.body);

  res.status(200).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const deleteResult = await contacts.removeContact(contactId);

  if (deleteResult === null) throw HttpError(404, "Not found");

  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateSchema.validate(req.body);

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");
  if (error) throw HttpError(400, error.message);

  const updatedContact = await contacts.updateContact(contactId, req.body);

  if (updatedContact === null) throw HttpError(404, "Not found");

  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
