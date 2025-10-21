const verifyOtpService = require("../../../services/auth/verification/verifyOtpService");

exports.verifyRegistrationOtp = async (req, res) => {
  const userId = req.user.id;
  const tokenType = req.user.tokenType;
  const { otp } = req.body;

  try {
    const result = await verifyOtpService.verifyRegistrationOtp(
      userId,
      otp,
      tokenType
    );

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

  try {
    const result = await verifyOtpService.verifyLoginOtp(
      userId,
      otp,
      tokenType
    );

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

  try {
    const result = await verifyOtpService.verifyPasswordResetOtp(
      userId,
      otp,
      tokenType
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || "Internal server error.",
    });
  }
};
