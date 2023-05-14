const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put("/:id", validateBody(schemas.contactUpdateSchema), contactsController.updateContact)

router.delete("/:id", contactsController.removeContact)

module.exports = router;
