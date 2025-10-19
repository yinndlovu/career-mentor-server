const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Otp = sequelize.define("Otp", {
  type: {
    type: DataTypes.ENUM("email_verification", "password_reset", "two_factor"),
    allowNull: false,
  },
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

module.exports = Otp;
