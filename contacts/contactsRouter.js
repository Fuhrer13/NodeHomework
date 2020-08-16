const express = require('express');
const contactsRouter = express.Router();

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  validateId,
  validationAddContact,
  validateUpdateUser,
} = require('./contactsControl');

contactsRouter.get('/', listContacts);

contactsRouter.get('/:contactId', validateId, getById);

contactsRouter.post('/', validationAddContact, addContact);

contactsRouter.delete('/:contactId', validateId, removeContact);

contactsRouter.patch(
  '/:contactId',
  validateId,
  validateUpdateUser,
  updateContact,
);

module.exports = contactsRouter;
