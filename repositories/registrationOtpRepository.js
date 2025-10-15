const { RegistrationOtp } = require("../models");

exports.upsertOtp = async (otp, userId) => {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  let otpRecord = await RegistrationOtp.findOne({
    where: { userId },
  });

  if (otpRecord) {
    otpRecord.otp = otp;
    otpRecord.expiresAt = expiresAt;

    otpRecord.save();
  } else {
    RegistrationOtp.create({
      otp,
      userId,
      expiresAt,
    });
  }
};

exports.findByUserId = async (userId) => {
  const otpRecord = await RegistrationOtp.findOne({
    where: { userId },
  });

  return otpRecord;
};

exports.save = async (registrationOtp) => {
  return await registrationOtp.save();
};
