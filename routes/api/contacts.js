const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators");
const { isValidId } = require("../../helpers");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put("/:id", isValidId, validateBody(schemas.contactUpdateSchema), contactsController.updateContact)

router.delete("/:id", isValidId, contactsController.removeContact)

module.exports = router;
