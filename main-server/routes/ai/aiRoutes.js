const express = require("express");
const resumeRoutes = require("./resumeRoutes");
const interviewRoutes = require("./interviews/speechAnalysisRoute");
const router = express.Router();

router.use("/ai/resume", resumeRoutes);
router.use("/ai/interview", interviewRoutes);
module.exports = router;
