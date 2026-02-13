const speechAnalysisService = require("../../../services/ai/getResumeTemplate/interviews/speechAnalysisService");
const convertToWav = require("../../../utils/convertToWav");

module.exports = async (req, res) => {
  console.log("speeech annalyasisi hit");
  const user_id = req.userId;
  const convertedPath = await convertToWav(req.file.path);
  const result = await speechAnalysisService(user_id, convertedPath);
  res.status(200);
};
