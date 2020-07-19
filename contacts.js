const fs = require("fs").promises;
const path = require("path");
const constants = require("./constants");
const contactsPath = path.join(__dirname, constants.CONTACTS_FILE);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.table(JSON.parse(data));
  return JSON.parse(data);
}

async function getContactById(id) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const contact = contacts.find((el) => el.id === id);
  console.log(contact);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function removeContact(id) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const remove = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(remove));
}

module.exports = { listContacts, getContactById, addContact, removeContact };
