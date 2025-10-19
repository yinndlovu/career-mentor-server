const express = require("express");
const router = express.Router();

const loginController = require("../../controllers/auth/login/loginController");

router.post("/login", loginController.login);

module.exports = router;
