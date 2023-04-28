const express = require("express");
const router = express.Router();
const authCtrl = require("../../auth/authController.js");

router.post("/signup", authCtrl.registration);

router.post("/login", authCtrl.login);

router.get("/current", authCtrl.auth, authCtrl.currentUser);

router.get("/logout", authCtrl.auth, authCtrl.logout);
module.exports = router;
