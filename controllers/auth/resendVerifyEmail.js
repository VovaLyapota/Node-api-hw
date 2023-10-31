const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  const { BASE_URL } = process.env;
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Email has alredy been verificated");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify${user.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = resendVerifyEmail;
