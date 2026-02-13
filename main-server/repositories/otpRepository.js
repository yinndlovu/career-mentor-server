const { Otp } = require("../models");

exports.upsertOtp = async (otp, userId, type, expiryMinutes = 5) => {
  let expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  let otpRecord = await Otp.findOne({ where: { userId, type } });

  if (otpRecord) {
    otpRecord.otp = otp;
    otpRecord.expiresAt = expiresAt;
    otpRecord.type = type;

    await otpRecord.save();
  } else {
    await Otp.create({ otp, userId, expiresAt, type });
  }
};

exports.findByUserId = async (userId) => {
  const otpRecord = await Otp.findOne({
    where: { userId },
  });

  return otpRecord;
};

exports.save = async (otp) => {
  return await otp.save();
};

exports.deleteByUserAndType = async (userId, type) => {
  return await Otp.destroy({ where: { userId, type } });
};
