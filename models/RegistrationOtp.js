const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RegistrationOtp = sequelize.define("RegistrationOtp", {});

module.exports = RegistrationOtp;
