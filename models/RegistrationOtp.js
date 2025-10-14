const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RegistrationOtp = sequelize.define("RegistrationOtp", {
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

module.exports = RegistrationOtp;
