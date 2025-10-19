const {
  createResumeTemplate,
} = require("../../../services/ai/getResumeTemplate/resumeTemplateService");

module.exports = resumeTemplate = async (req, res) => {
  console.log("endpoint hit");
  const { mimetype, buffer } = req.file;
  const result = await createResumeTemplate(buffer, mimetype);
  res.status(200).json({ message: "templated created", template: result });
};
