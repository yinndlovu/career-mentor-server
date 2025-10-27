const express = require("express");

const resumeController = require("../../controllers/ai/Resumes/resumeTemplateController");
const { pdfUploadMiddleware } = require("../../middlewares/verifyPDF");
const router = express.Router();

router.post("/create", pdfUploadMiddleware, resumeController.resumeTemplate);
router.post("/analysis", resumeController.resumeAnalysis);

module.exports = router;
