const verifyOtpService = require("../../../services/auth/verification/verifyOtpService");

exports.verifyRegistrationOtp = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  try {
    const result = await verifyOtpService.verifyRegistrationOtp(userId, otp);

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || "Internal server error.",
    });
  }
};
