const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// internal
const otpRepository = require("../../../repositories/otpRepository");
const userRepository = require("../../../repositories/userRepository");
const OtpTypes = require("../../../models/enums/otpTypes");

dotenv.config();

exports.verifyRegistrationOtp = async (userId, otp) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw {
      status: 404,
      message: "User doesn't exist.",
    };
  }

  if (user.isVerified) {
    throw {
      status: 400,
      message: "Email already verified.",
    };
  }

  const registrationOtp = await otpRepository.findByUserId(userId);

  if (!registrationOtp) {
    throw {
      status: 400,
      message: "Invalid PIN. Please request a new one.",
    };
  }

  if (registrationOtp.type !== OtpTypes.EMAIL_VERIFICATION) {
    throw {
      status: 400,
      message: "Invalid Otp type. Please request a new one.",
    };
  }

  if (registrationOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "PIN has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, registrationOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid PIN. Please try again.",
    };
  }

  user.isVerified = true;
  await userRepository.save(user);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};

exports.verifyLoginOtp = async (userId, otp) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw {
      status: 404,
      message: "User doesn't exist.",
    };
  }

  const loginOtp = await otpRepository.findByUserId(userId);

  if (!loginOtp) {
    throw {
      status: 400,
      message: "Invalid PIN. Please request a new one.",
    };
  }

  if (loginOtp.type !== OtpTypes.TWO_FACTOR) {
    throw {
      status: 400,
      message: "Invalid Otp type. Please request a new one.",
    };
  }

  if (loginOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "PIN has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, loginOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid PIN. Please try again.",
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};

exports.verifyPasswordResetOtp = async (userId, otp) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw {
      status: 404,
      message: "User doesn't exist.",
    };
  }

  const passwordResetOtp = await otpRepository.findByUserId(userId);

  if (!passwordResetOtp) {
    throw {
      status: 400,
      message: "Invalid PIN. Please request a new one.",
    };
  }

  if (passwordResetOtp.type !== OtpTypes.PASSWORD_RESET) {
    throw {
      status: 400,
      message: "Invalid Otp type. Please request a new one.",
    };
  }

  if (passwordResetOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "PIN has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, passwordResetOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid PIN. Please try again.",
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};
