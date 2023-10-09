const ctrlWrapper = (ctrl) =>
  async function (req, res, next) {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

module.exports = ctrlWrapper;
