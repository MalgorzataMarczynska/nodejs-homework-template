const express = require("express");
const router = express.Router();
const contactsFunc = require("../../controllers/dispatchers.js");

router.get("/", contactsFunc.get);

router.get("/:contactId", contactsFunc.getById);

router.post("/", contactsFunc.create);

router.delete("/:contactId", contactsFunc.remove);

router.put("/:contactId", contactsFunc.update);

router.patch("/:contactId/favorite", contactsFunc.updateStatusContact);

module.exports = router;
