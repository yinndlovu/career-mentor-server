const recommendedJobsService = require("../../services/user/recommendedJobsService");
module.exports = userJobRecommedation = async (req, res) => {
  const userId = req.user.id;
  const result = await recommendedJobsService(userId);
  res.status(result.status).json({ message: result.message });
};
