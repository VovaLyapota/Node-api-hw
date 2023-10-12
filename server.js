const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

// "mongodb+srv://Vova:fGLdmTqU5xGqbPQ5@db-contacts.4cyiybs.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("MongoDB connect success");
  })
  .catch((error) => {
    console.log("MongoDB connect error", error.message);
    process.exit(1);
  });
