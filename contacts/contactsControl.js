const Joi = require('joi');
const contactsModel = require('./contactsModel');
const {
  Types: { ObjectId },
} = require('mongoose');

async function listContacts(req, res, next) {
  try {
    const contactsList = await contactsModel.find();
    console.table(contactsList);
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const targetContact = await contactsModel.findById(contactId);

    if (!targetContact) {
      return res.status(404).send();
    }
    return res.status(200).json(targetContact);
  } catch (error) {
    next(error);
  }
}
function validateId(req, res, next) {
  const id = req.params.contactId;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
}

async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsModel.findByIdAndDelete(contactId);
    if (!removedContact) {
      return res.status(404).send();
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  try {
    const newContact = await contactsModel.create(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

function validationAddContact(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().allow(''),
  });
  const validationResult = validationRules.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error);
  }
  next();
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactsModel.findByIdAndUpdate(
      contactId,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );
    if (!updatedContact) {
      return res.status(404).send();
    }
    return res.status(204).send();
  } catch (error) {
    console.log(error);
  }
}

function validateUpdateUser(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().allow(''),
  });
  const validationResult = validationRules.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error);
  }
  next();
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  validateId,
  validationAddContact,
  validateUpdateUser,
};
