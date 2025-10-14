const userRepository = require("../../../repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { validateEmail } = require("../../../validators/validateEmail");
const { validatePassword } = require("../../../validators/validatePassword");

exports.register = async (fullNames, surname, email, password) => {
  const trimmedEmail = email ? email.trim() : "";
  const trimmedFullNames = fullNames ? fullNames.trim() : "";

  const { isValid: isValidEmail, error: emailError } =
    validateEmail(trimmedEmail);
  const { isValid: isValidPassword, error: passwordError } =
    validatePassword(password);

  if (!isValidEmail) {
    throw {
      status: 400,
      message: emailError,
    };
  }

  if (!isValidPassword) {
    throw {
      status: 400,
      message: passwordError,
    };
  }

  if (!trimmedFullNames) {
    throw {
      status: 400,
      message: "Please enter your name.",
    };
  }

  const existingUser = await userRepository.findByEmail(trimmedEmail);

  if (existingUser) {
    throw {
      status: 400,
      message: "This email is already in use.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(
    fullNames,
    surname,
    email,
    hashedPassword
  );

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "90d" }
  );

  return {
    message: "You have successfully registered.",
    userId: user.id,
    fullNames: user.fullNames,
    surname: user.surname,
    email: user.email,
    token: token,
  };
};
