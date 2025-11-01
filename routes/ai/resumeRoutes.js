const express = require("express");

const resumeController = require("../../controllers/ai/Resumes/resumeTemplateController");
const { pdfUploadMiddleware } = require("../../middlewares/verifyPDF");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/create",
  verifyToken,
  pdfUploadMiddleware,
  resumeController.resumeTemplate
);
router.post("/analysis", verifyToken, resumeController.resumeAnalysis);
router.post("/tailored", verifyToken, resumeController.tailoredResume);

module.exports = router;
