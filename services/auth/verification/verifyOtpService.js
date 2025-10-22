const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal
const otpRepository = require("../../../repositories/otpRepository");
const userRepository = require("../../../repositories/userRepository");
const OtpTypes = require("../../../enums/otpTypes");
const TokenTypes = require("../../../enums/tokenTypes");

exports.verifyRegistrationOtp = async (userId, otp, tokenType) => {
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

  if (tokenType !== TokenTypes.EMAIL_VERIFICATION_TOKEN) {
    throw {
      status: 400,
      message: "Session expired. Please try again.",
    };
  }

  const registrationOtp = await otpRepository.findByUserId(userId);

  if (!registrationOtp) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (registrationOtp.type !== OtpTypes.EMAIL_VERIFICATION) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (registrationOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "OTP has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, registrationOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid OTP. Please try again.",
    };
  }

  user.isVerified = true;
  await userRepository.save(user);

  await otpRepository.deleteByUserAndType(user.id, OtpTypes.EMAIL_VERIFICATION);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
      tokenType: TokenTypes.ACCESS_TOKEN,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};

exports.verifyLoginOtp = async (userId, otp, tokenType) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw {
      status: 404,
      message: "User doesn't exist.",
    };
  }

  if (tokenType !== TokenTypes.LOGIN_TOKEN) {
    throw {
      status: 400,
      message: "Session expired. Please try again.",
    };
  }

  const loginOtp = await otpRepository.findByUserId(userId);

  if (!loginOtp) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (loginOtp.type !== OtpTypes.TWO_FACTOR) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (loginOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "OTP has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, loginOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid OTP. Please try again.",
    };
  }

  await otpRepository.deleteByUserAndType(user.id, OtpTypes.TWO_FACTOR);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
      tokenType: TokenTypes.ACCESS_TOKEN,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};

exports.verifyPasswordResetOtp = async (userId, otp, tokenType) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw {
      status: 404,
      message: "User doesn't exist.",
    };
  }

  if (tokenType !== TokenTypes.PASSWORD_RESET_TOKEN) {
    throw {
      status: 400,
      message: "Session expired. Please try again.",
    };
  }

  const passwordResetOtp = await otpRepository.findByUserId(userId);

  if (!passwordResetOtp) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (passwordResetOtp.type !== OtpTypes.PASSWORD_RESET) {
    throw {
      status: 400,
      message: "Invalid OTP. Please request a new one.",
    };
  }

  if (passwordResetOtp.expiresAt < new Date()) {
    throw {
      status: 400,
      message: "OTP has expired. Please request a new one.",
    };
  }

  const isOtpValid = await bcrypt.compare(otp, passwordResetOtp.otp);

  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Invalid OTP. Please try again.",
    };
  }

  await otpRepository.deleteByUserAndType(user.id, OtpTypes.PASSWORD_RESET);

  return {
    message: "OTP successfully verified.",
    token: token,
  };
};
