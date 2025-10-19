const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const userRepo = require("../../../repositories/userRepository");
const otpRepository = require("../../../repositories/otpRepository");
const OtpTypes = require("../../../models/enums/otpTypes");

dotenv.config();

exports.Login = async (email, password) => {
  const user = userRepo.findByEmail(email);

  if (!user) {
    throw {
      status: 404,
      message: "Invalid credentials.",
    };
  }

  isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw {
      status: 403,
      message: "Invalid credentials.",
    };
  }

  const otp = Math.floor(1000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await otpRepository.upsertOtp(hashedOtp, user.id, OtpTypes.TWO_FACTOR);

  return {
    message: "Successfully registered.",
  };
};
