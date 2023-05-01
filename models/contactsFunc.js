const Contact = require("./schemas/contact.js");

const listContacts = async (query) => {
  const { page, limit } = query;
  return Contact.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
const countContacts = async () => {
  return Contact.countDocuments();
};
const filterContacts = async (query) => {
  const { page, limit } = query;
  return Contact.find({ favorite: { $eq: query } })
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
const countfilteredContacts = async (query) => {
  return Contact.find({ favorite: { $eq: query } }).countDocuments();
};
const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = {
  listContacts,
  countContacts,
  filterContacts,
  countfilteredContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
