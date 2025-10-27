const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// internal
const userRepository = require("../../../repositories/userRepository");
const otpRepository = require("../../../repositories/otpRepository");
const OtpTypes = require("../../../enums/otpTypes");
const TokenTypes = require("../../../enums/tokenTypes");
const { generateOtp } = require("../../../utils/otpGenerator");

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw {
      status: 404,
      message: "Invalid credentials.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw {
      status: 403,
      message: "Invalid credentials.",
    };
  }

  if (!user.isVerified) {
    const { otp, hashedOtp } = await generateOtp();

    await otpRepository.upsertOtp(
      hashedOtp,
      user.id,
      OtpTypes.EMAIL_VERIFICATION,
      60
    );

    console.log("REGISTRATION OTP FOR " + email + ": " + otp);

    return {
      shouldVerify: true,
      message: "Please verify your account to continue.",
    };
  }

  const { otp, hashedOtp } = generateOtp();

  await otpRepository.upsertOtp(hashedOtp, user.id, OtpTypes.TWO_FACTOR, 10);
  console.log(`LOGIN OTP for ${email}: ${otp}`);

  const token = jwt.sign(
    {
      id: user.id,
      tokenType: TokenTypes.LOGIN_TOKEN,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  return {
    message: "OTP sent for login verification.",
    token: token,
  };
};
