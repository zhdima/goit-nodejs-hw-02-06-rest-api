const express = require("express");

const userController = require("../../controllers/users-controller");

const { authenticate, upload } = require("../../middlewares");

const schemas = require("../../schemas/users-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.use(authenticate);

router.patch("/subscription", validateBody(schemas.userUpdateSubscriptionSchema), userController.updateUser);

router.patch("/avatars", upload.single("avatar"), userController.updateAvatar);

module.exports = router;
