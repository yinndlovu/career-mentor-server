const express = require("express");
const jobRecommendationController = require("../../controllers/user/jobRecommendationController");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
router.get("/recommemdedJobs", verifyToken, jobRecommendationController);

module.exports = router;
