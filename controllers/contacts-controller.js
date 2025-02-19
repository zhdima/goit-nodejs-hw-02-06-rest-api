const contactsService = require("../models/contacts-db");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const listContacts = async (req, res) => {
  const owner = req.user._id;
  const { page = 1, limit = 20 } = req.query;
  const { favorite = null } = req.query;
  
  const filter = { owner };
  if (favorite !== null) {
    filter.favorite = favorite;
  }
    
  const result = await contactsService.listContacts(filter, page, limit);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const owner = req.user._id;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.json({ message: "Contact deleted", result });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
