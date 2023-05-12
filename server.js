const app = require("./app");
const mongoose = require("mongoose");
const utils = require("./public/middlewares/utils.js");
const storage = require("./public/middlewares/upload.js");
require("dotenv").config();
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connecting...");
    app.listen(3000, () => {
      console.log("Database connection successful");
      utils.initDirectory(storage.UPLOAD_DIR);
      utils.initDirectory(storage.AVATAR_DIR);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
process.on("SIGINT", () => {
  mongoose.disconnect();
  console.log("Database disconnected");
});
