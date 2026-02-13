const registerService = require("../../../services/auth/registration/registerService");

exports.register = async (req, res) => {
  const { fullNames, surname, email, password } = req.body;

  try {
    const result = await registerService.register(
      fullNames,
      surname,
      email,
      password
    );

    res.status(201).json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal server error. " });
  }
};
