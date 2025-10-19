const express = require("express");
const router = express.Router();

const loginController = require("../../controllers/auth/login/loginController");
const verifyToken = require("../../middlewares/verifyToken");
const verifyOtpController = require("../../controllers/auth/verification/verifyOtpController");

router.post("/login", loginController.login);
router.post("/login/verify", verifyToken, verifyOtpController.verifyLoginOtp);

module.exports = router;
