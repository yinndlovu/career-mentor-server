const speechAnalysisService = require("../../../services/ai/getResumeTemplate/interviews/speechAnalysisService")

module.exports = async(req,res)=>{
    const user_id = req.userId;
    const audio = req.file
    const result = await speechAnalysisService(user_id,audio)

}