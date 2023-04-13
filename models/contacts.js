const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const data = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(data);
    const contactById = parsedData.find((contact) => contact.id === contactId);
    return contactById;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(data);
    const contactsWithoutId = parsedData.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      "models/contacts.json",
      JSON.stringify(contactsWithoutId, null, 2)
    );
    const newData = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedNewData = JSON.parse(newData);
    return parsedNewData;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const fileData = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(fileData);
    parsedData.push(body);
    await fs.writeFile(
      "models/contacts.json",
      JSON.stringify(parsedData, null, 2)
    );
    const newData = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedNewData = JSON.parse(newData);
    return parsedNewData;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const fileData = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(fileData);
    const contactById = parsedData.find((contact) => contact.id === contactId);
    const contactIndex = parsedData.findIndex(
      (contact) => contact.id === contactId
    );
    const { name, email, phone } = body;
    contactById.name = name;
    contactById.email = email;
    contactById.phone = phone;
    const newUserData = { id: contactId, name, email, phone };
    parsedData.splice(contactIndex, 1, newUserData);
    await fs.writeFile(
      "models/contacts.json",
      JSON.stringify(parsedData, null, 2)
    );
    const newContacts = await fs.readFile("models/contacts.json", {
      encoding: "utf8",
    });
    const parsedNewData = JSON.parse(newContacts);
    return parsedNewData[contactIndex];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
