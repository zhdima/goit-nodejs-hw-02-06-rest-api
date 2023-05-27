const express = require("express");

const userController = require("../../controllers/users-controller");

const { authenticate } = require("../../middlewares");

const schemas = require("../../schemas/users-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.use(authenticate);

router.patch("/subscription", validateBody(schemas.userUpdateSubscriptionSchema), userController.updateUser);

module.exports = router;
