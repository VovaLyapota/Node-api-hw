const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("./contacts");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("./auth");

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
