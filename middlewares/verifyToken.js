const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Missing token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(403).json({
        error: "User not found.",
      });
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(403).json({
        error: "Session expired, please log in again.",
      });
    }

    if (decoded.email !== user.email) {
      return res.status(403).json({
        error: "Email mismatch.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      error: "Invalid token.",
    });
  }
};

module.exports = verifyToken;
