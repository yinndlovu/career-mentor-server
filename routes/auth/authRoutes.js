const express = require("express");
const router = express.Router();

const registerRoute = require("./registerRoute");

router.use("/auth", registerRoute);

module.exports = router;
