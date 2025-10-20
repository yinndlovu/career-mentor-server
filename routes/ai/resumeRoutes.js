const express = require("express");

const resumeTemplate = require("../../controllers/ai/Resumes/resumeTemplateController");
const { pdfUploadMiddleware } = require("../../middlewares/verifyPDF");
const router = express.Router();

router.post("/create", pdfUploadMiddleware, resumeTemplate);

module.exports = router;
