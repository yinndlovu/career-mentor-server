const express = require("express");
const speechAnalysisController = require("../../../controllers/ai/interviews/speechAnalysisController");
const verifyToken = require("../../../middlewares/verifyToken");
const router = express.Router();

router.post("/speech-prep", verifyToken,audiol,speechAnalysisController);

module.exports = router;
