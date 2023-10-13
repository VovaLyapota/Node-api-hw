const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("MongoDB connection successfull");
  })
  .catch((error) => {
    console.log("MongoDB connect error", error.message);
    process.exit(1);
  });
