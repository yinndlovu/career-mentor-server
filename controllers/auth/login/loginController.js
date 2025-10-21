const loginService = require("../../../services/auth/login/loginService");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginService.login(email, password);

    res.status(200).json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal server error. " });
  }
};
