const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const storage = require("./public/middlewares/upload.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/api/users/avatars", express.static(storage.AVATAR_DIR));

require("./config/passportConfig.js");
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes: /api/signup - registration user {username, email, password} /api/login - login {email, password} /api/contacts - get message if user is authenticated`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
