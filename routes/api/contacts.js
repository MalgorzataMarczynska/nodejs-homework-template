const express = require("express");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const contactsFunction = require("../../models/contacts.js");
const router = express.Router();
const validSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\w]+([\s]{1}[a-zA-Z]+)*$/i)
    .min(3)
    .max(35)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk", "ca"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[(\w)]+([-\s]{1}[0-9]+)*$/i)
    .min(12)
    .required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await contactsFunction.listContacts();
  res.json({ message: "success", code: 200, data: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFunction.getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found such id" });
  res.json({ message: "success", code: 200, data: { contact } });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = validSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: error.message });
  const userId = uuidv4();
  const newUser = { id: userId, name, email, phone };
  await contactsFunction.addContact(newUser);
  res.status(201).json({ code: 201, data: { newUser } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  contactsFunction.removeContact(contactId);
  const contact = await contactsFunction.getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found such id" });
  res.json({ message: "contact deleted", code: 200 });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = validSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: error.message });
  const user = { name, email, phone };
  const updateContact = await contactsFunction.updateContact(contactId, user);
  const contact = await contactsFunction.getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found such id" });
  res.status(200).json({ code: 200, data: { updateContact } });
});

module.exports = router;
