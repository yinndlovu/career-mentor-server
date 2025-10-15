const bcrypt = require("bcrypt");

// internal
const registrationOtpRepository = require("../../../repositories/registrationOtpRepository");
const userRepository = require("../../../repositories/userRepository");

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

  const registrationOtp = await registrationOtpRepository.findByUserId(userId);

  if (!registrationOtp) {
    throw {
      status: 400,
      message: "Invalid PIN. Please request a new one.",
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

  return {
    message: "OTP successfully verified.",
  };
};
