const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const getContactsList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    console.table(getContactsList);
    return getContactsList;
  } catch (error) {
    console.error('file does not exist', error);
  }
}

async function getById(contactId) {
  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const targetContact = contactsList.find(
      contact => contact.id === contactId,
    );
    return targetContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const targetContactIndex = contactsList.findIndex(
      contact => contact.id === contactId,
    );
    if (targetContactIndex === -1) {
      return false;
    }
    newContactsList = contactsList.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8');
    console.table(newContactsList);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const newContact = {
      id: contactsList.length + 1,
      name: name,
      email: email,
      phone: phone,
    };
    newContactsList = [...contactsList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8');
    console.table(newContactsList);

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(id, body) {
  try {
    const contactList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const targetContact = contactList.find(contact => contact.id === id);
    const updatedContact = {
      ...targetContact,
      ...body,
    };
    const newContactsList = [...contactList, updatedContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8');
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
