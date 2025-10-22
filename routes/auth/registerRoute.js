const express = require("express");
const router = express.Router();

// internal
const registerController = require("../../controllers/auth/registration/registerController");
const verifyOtpToken = require("../../middlewares/verifyOtpToken");
const verifyOtpController = require("../../controllers/auth/verification/verifyOtpController");

router.post("/register", registerController.register);

router.post(
  "/register/verify",
  verifyOtpToken,
  verifyOtpController.verifyRegistrationOtp
);

module.exports = router;
