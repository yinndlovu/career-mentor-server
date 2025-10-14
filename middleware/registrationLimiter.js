const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyGenerator: ipKeyGenerator,
  message: {
    error: "Too many registration attempts, please try again later",
  },

  handler: (req, res, ignoredNext, options) => {
    console.warn(`Rate limit reached for IP: ${req.rateLimit.key}`);
    res.status(options.statusCode).json(options.message);
  },

  keyGenerator: (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }
    return req.ip;
  },
});

module.exports = registrationLimiter;
