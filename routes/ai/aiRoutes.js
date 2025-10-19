const express = require("express");
const resumeRoutes = require("./resumeRoutes");
const router = express.Router();

router.use("/ai/resume", resumeRoutes);
module.exports = router;
