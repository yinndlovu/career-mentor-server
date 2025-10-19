const verifyOtpService = require("../../../services/auth/verification/verifyOtpService");
const TokenTypes = require("../../../services/auth/enums/tokenTypes");

exports.verifyRegistrationOtp = async (req, res) => {
  const userId = req.user.id;
  const tokenType = req.user.tokenType;
  const { otp } = req.body;

  if (tokenType !== TokenTypes.EMAIL_VERIFICATIONTOKEN) {
    return res.status(403).json({
      message: "Invalid token type.",
    });
  }
  try {
    const result = await verifyOtpService.verifyRegistrationOtp(userId, otp);

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || "Internal server error.",
    });
  }
};

exports.verifyLoginOtp = async (req, res) => {
  const userId = req.user.id;
  const tokenType = req.user.tokenType;
  const { otp } = req.body;

  if (tokenType !== TokenTypes.LOGIN_TOKEN) {
    return res.status(403).json({
      message: "Invalid token type.",
    });
  }
  try {
    const result = await verifyOtpService.verifyLoginOtp(userId, otp);

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || "Internal server error.",
    });
  }
};

exports.verifyPasswordRestOtp = async (req, res) => {
  const userId = req.user.id;
  const tokenType = req.user.tokenType;
  const { otp } = req.body;

  if (tokenType !== TokenTypes.PASSWORD_RESETTOKEN) {
    return res.status(403).json({
      message: "Invalid token type.",
    });
  }
  try {
    const result = await verifyOtpService.verifyPasswordResetOtp(userId, otp);

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || "Internal server error.",
    });
  }
};
