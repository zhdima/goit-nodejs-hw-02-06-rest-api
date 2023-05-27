const { model } = require("mongoose");

const { contactSchema } = require("../schemas/contacts-schemas");

const Contacts = model("contact", contactSchema);

const listContacts = async (owner, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const result = await Contacts.find({owner}, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
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
