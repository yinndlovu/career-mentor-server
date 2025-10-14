const { User } = require("../models");

exports.createUser = async (fullNames, surname = null, email, password) => {
  const user = await User.create({
    fullNames,
    surname,
    email,
    password,
    tokenVersion: 0,
  });

  return {
    id: user.id,
    fullNames: user.fullNames,
    surname: user.surname,
    email: user.email,
  };
};

exports.findByEmail = async (email) => {
  const user = await User.findOne({
    where: email,
  });

  return user;
};
