const { model } = require("mongoose");

const { contactSchema } = require("../schemas/contacts-schemas");

const Contacts = model("contact", contactSchema);

const listContacts = async () => {
  const result = await Contacts.find({}, "-createdAt -updatedAt");
  return result;
}

const getContactById = async (contactId) => {
  const result = await Contacts.findById(contactId);
  return result;
}

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndDelete(contactId);
  return result;
}

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
}

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(contactId, body, {new: true});
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
