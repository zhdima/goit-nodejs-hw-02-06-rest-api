const express = require("express");

const authController = require("../../controllers/auth-controller");

const { authenticate } = require("../../middlewares");

const schemas = require("../../schemas/users-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);

router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

module.exports = router;
