const { default: axios } = require("axios");
const { findById } = require("../../repositories/userRepository");
const { readJsonFileFromGCP } = require("../../utils/googleBucketHelper");
module.exports = async function userRecommendedJobs(userId) {
  const user = await findById(userId);
  const string_resume = await readJsonFileFromGCP(user.email);
  const json_resume = JSON.parse(string_resume);
  const job_role = `${json_resume.ai_analysis_hints.target_role} ${json_resume.ai_analysis_hints.experience_level}`;
  const jobs = await scrapedJobs(job_role);
  return jobs;
};
const scrapedJobs = async (role) => {
  try {
    const res = await axios.post(
      "https://scrapper.thewoo.online/api/scrape/job",
      { role: role }
    );
    return {
      status: 200,
      message: res.data,
    };
  } catch (err) {
    return {
      status: 500,
      message: "somthing went wrong",
    };
  }
};
