const express = require("express");
const router = express.Router();

const loginController = require("../../controllers/auth/login/loginController");
const verifyOtpToken = require("../../middlewares/verifyOtpToken");
const verifyOtpController = require("../../controllers/auth/verification/verifyOtpController");

router.post("/login", loginController.login);
router.post("/login/verify", verifyOtpToken, verifyOtpController.verifyLoginOtp);

module.exports = router;
