const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connecting...");
    app.listen(3000, () => {
      console.log("Database connection successful");
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
