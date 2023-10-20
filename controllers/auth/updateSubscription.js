const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, req.body);

  res.json({
    message: "Update success",
  });
};

module.exports = updateSubscription;
