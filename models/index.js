const sequelize = require("sequelize");
const User = require("./User");
const Otp = require("./Otp");

User.hasOne(Otp, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Otp.belongsTo(Otp, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = {
  sequelize,
  User,
  Otp,
};
