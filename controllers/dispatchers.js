const models = require("../models/contactsFunc.js");

const get = async (req, res, next) => {
  try {
    const contacts = await models.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await models.getContactById(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await models.addContact({ name, email, phone });
    res.status(201).json({
      status: "created",
      code: 201,
      data: { newContact },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ status: "error", message: "missing field" });

  try {
    const updatedContact = await models.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedContact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletingContact = await models.removeContact(contactId);
    if (deletingContact) {
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  if (favorite === "")
    return res
      .status(400)
      .json({ status: "error", message: "missing field favorite" });
  try {
    const updatedFav = await models.updateContact(contactId, { favorite });
    if (updatedFav) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedFav },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
};
