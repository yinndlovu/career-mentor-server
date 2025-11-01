const express = require("express");
const multer = require("multer");
// const verifyToken = require("../../../middlewares/verifyToken");
// const audioLengthValidation = require("../../../middlewares/audioLengthValidation");
const speechAnalysisController = require("../../../controllers/ai/interviews/speechAnalysisController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/speech-prep",
  upload.single("audio"),
  //   audioLengthValidation,
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file uploaded" });
      }

      await speechAnalysisController(req, res, next);
    } catch (err) {
      console.error("Error saving WAV file:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
