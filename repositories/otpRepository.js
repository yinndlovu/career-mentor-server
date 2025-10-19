const { Otp } = require("../models");
const OtpTypes = require("../models/enums/otpTypes");

exports.upsertOtp = async (otp, userId, type) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  if (type === OtpTypes.EMAIL_VERIFICATION) {
    expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  }

  let otpRecord = await Otp.findOne({
    where: { userId },
  });

  if (otpRecord) {
    otpRecord.otp = otp;
    otpRecord.expiresAt = expiresAt;

    otpRecord.save();
  } else {
    Otp.create({
      otp,
      userId,
      expiresAt,
      type,
    });
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
