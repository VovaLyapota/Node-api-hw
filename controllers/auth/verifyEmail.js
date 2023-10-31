const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) throw HttpError(401, "Email has alredy been verificated");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Email verify success",
  });
};

module.exports = verifyEmail;
