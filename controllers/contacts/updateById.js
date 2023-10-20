const Contact = require("../../models/contact");
const { HttpError } = require("../../utils");

const updateById = async (req, res) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result === null) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = updateById;
