const path = require("path");
const {
  createResumeTemplate,
  createResumeJobAnalysis,
  createTailoredResume,
} = require("../../../services/ai/getResumeTemplate/resumeServices");

exports.resumeTemplate = async (req, res) => {
  console.log("endpoint hit");
  const { mimetype, buffer } = req.file;
  const result = await createResumeTemplate(buffer, mimetype);
  res.status(200).json({ message: "templated created", template: result });
};
exports.resumeAnalysis = async (req, res) => {
  console.log("endpoint hit analysis");
  const { job_description } = req.body;
  const pdf_path = path.join(__dirname, "da user json name");
  const result = await createResumeJobAnalysis(job_description, pdf_path);
  res.status(200).json({ message: "analysis completed", result: result });
};
exports.tailoredResume = async (req, res) => {
  console.log("endpoint hit tailored");
  const { job_description } = req.body;
  const pdf_path = path.join(__dirname, "test_resume.json");
  const resumeData = require(pdf_path);
  const result = await createTailoredResume(job_description, resumeData);
  res.status(result.status).json({ message: "latex resume ", result: result });
};
