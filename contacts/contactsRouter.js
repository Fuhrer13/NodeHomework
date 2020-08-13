const express = require('express');
const contactsRouter = express.Router();

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('./contactsControl');

contactsRouter.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  const contactId = parseInt(req.params.contactId);
  const targetContact = await getById(contactId);
  if (!targetContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(targetContact);
});

contactsRouter.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  newContact = await addContact(name, email, phone);
  return res.status(201).json(newContact);
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  const contactId = parseInt(req.params.contactId);
  const targetContact = await removeContact(contactId);

  if (!targetContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json({ message: 'contact deleted' });
});

contactsRouter.patch('/:contactId', async (req, res, next) => {
  const contactId = parseInt(req.params.contactId);
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const updatedContact = await updateContact(contactId, req.body);
  return res.status(200).json(updatedContact);
});

module.exports = contactsRouter;
