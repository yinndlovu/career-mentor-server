const express = require("express");
const router = express.Router();

// internal
const registerController = require("../../controllers/auth/registration/registerController");
const verifyToken = require("../../middlewares/verifyToken");
const verifyOtpController = require("../../controllers/auth/verification/verifyOtpController");

router.post("/register", registerController.register);

router.put(
  "/register/verify",
  verifyToken,
  verifyOtpController.verifyRegistrationOtp
);

module.exports = router;
