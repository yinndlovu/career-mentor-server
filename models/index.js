const sequelize = require("sequelize");
const User = require("./User");
const RegistrationOtp = require("./RegistrationOtp");

User.hasOne(RegistrationOtp, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

RegistrationOtp.belongsTo(RegistrationOtp, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = {
  sequelize,
  User,
  RegistrationOtp,
};
