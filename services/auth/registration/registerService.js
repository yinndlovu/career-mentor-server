const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// internal
const userRepository = require("../../../repositories/userRepository");
const otpRepository = require("../../../repositories/otpRepository");
const OtpTypes = require("../../../enums/otpTypes");
const TokenTypes = require("../../../enums/tokenTypes");

// modules
const { validateEmail } = require("../../../validators/validateEmail");
const { validatePassword } = require("../../../validators/validatePassword");

exports.register = async (fullNames, surname, email, password) => {
  const trimmedEmail = email ? email.trim() : "";
  const trimmedFullNames = fullNames ? fullNames.trim() : "";

  const { isValid: isValidEmail, error: emailError } =
    validateEmail(trimmedEmail);
  const { isValid: isValidPassword, error: passwordError } =
    validatePassword(password);

  if (!isValidEmail) {
    throw {
      status: 400,
      message: emailError,
    };
  }

  if (!isValidPassword) {
    throw {
      status: 400,
      message: passwordError,
    };
  }

  if (!trimmedFullNames) {
    throw {
      status: 400,
      message: "Please enter your name.",
    };
  }

  const existingUser = await userRepository.findByEmail(trimmedEmail);

  if (existingUser) {
    throw {
      status: 400,
      message: "This email is already in use.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(
    fullNames,
    surname,
    email,
    hashedPassword
  );

  const otp = Math.floor(1000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await otpRepository.upsertOtp(
    hashedOtp,
    user.id,
    OtpTypes.EMAIL_VERIFICATION,
    60,
  );
  console.log("REGISTRATION OTP FOR " + email + ": " + otp);

  const token = jwt.sign(
    {
      id: user.id,
      tokenType: TokenTypes.EMAIL_VERIFICATION_TOKEN,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Successfully registered.",
    token: token,
  };
};
