const express = require("express");
const router = express.Router();

const registerRoute = require("./registerRoute");
const loginRoute = require("./loginRoute");

router.use("/auth", registerRoute);
router.use("/auth", loginRoute);

module.exports = router;
