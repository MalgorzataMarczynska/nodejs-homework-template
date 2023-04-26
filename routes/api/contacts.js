const express = require("express");
const router = express.Router();
const contactsFunc = require("../../controllers/dispatchers.js");
const authCtrl = require("../../auth/authController.js");

router.post("/users/signup", authCtrl.registration);

router.post("/users/login", authCtrl.login);

router.get("/users/current", authCtrl.auth, authCtrl.currentUser);

router.get("/users/logout", authCtrl.auth, authCtrl.logout);

router.get("/", authCtrl.auth, contactsFunc.get);

router.get("/:contactId", authCtrl.auth, contactsFunc.getById);

router.post("/", authCtrl.auth, contactsFunc.create);

router.delete("/:contactId", authCtrl.auth, contactsFunc.remove);

router.put("/:contactId", authCtrl.auth, contactsFunc.update);

router.patch(
  "/:contactId/favorite",
  authCtrl.auth,
  contactsFunc.updateStatusContact
);

module.exports = router;
