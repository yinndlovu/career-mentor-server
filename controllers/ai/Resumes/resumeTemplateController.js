const path = require("path");
const {
  createResumeTemplate,
  createResumeJobAnalysis,
  createTailoredResume,
} = require("../../../services/ai/getResumeTemplate/resumeServices");

exports.resumeTemplate = async (req, res) => {
  const userId = req.user.id;
  console.log("endpoint hit");
  const { mimetype, buffer } = req.file;
  const result = await createResumeTemplate(buffer, mimetype, userId);
  res.status(200).json({ message: "templated created", template: result });
};
exports.resumeAnalysis = async (req, res) => {
  const userId = req.user.id;
  console.log("endpoint hit analysis");
  const { job_description } = req.body;
  const result = await createResumeJobAnalysis(job_description, userId);
  res.status(200).json({ message: "analysis completed", result: result });
};
exports.tailoredResume = async (req, res) => {
  const userId = req.user.id;
  const { job_description } = req.body;
  const result = await createTailoredResume(job_description, userId);
  res.status(result.status).json({ message: "latex resume ", result: result });
};
