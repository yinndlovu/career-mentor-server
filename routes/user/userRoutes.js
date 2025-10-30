const express = require("express");
const jobRecommendationRoute = require("./jobRecommendationRoute");
const router = express.Router();

router.use("/user", jobRecommendationRoute);

module.exports = router;
