const express = require("express");
const router = express.Router();
const authCtrl = require("../../auth/authController.js");
const upload = require("../../public/middlewares/upload.js");

router.post("/signup", authCtrl.registration);

router.post("/login", authCtrl.login);

router.get("/current", authCtrl.auth, authCtrl.currentUser);

router.get("/logout", authCtrl.auth, authCtrl.logout);

router.patch("/", authCtrl.auth, authCtrl.updateSubscription);

router.patch(
  "/avatars",
  authCtrl.auth,
  upload.upload.single("avatar"),
  upload.changeAvatar
);

module.exports = router;
