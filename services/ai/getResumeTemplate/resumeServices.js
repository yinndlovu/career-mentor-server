const { Blob } = require("buffer");
const { GoogleGenAI } = require("@google/genai");
const universalTemplate = require("../../../utils/universalTemplate");
const jobMatchStructure = require("../../../utils/jobMatchStructure");
const latexStructure = require("../../../utils/latexStructure");
const { cleanResume } = require("../../../utils/resumeCleaner");
const {
  saveJsonResumeToBucket,
  readJsonFileFromGCP,
} = require("../../../utils/googleBucketHelper");
const { default: axios } = require("axios");
const userRepository = require("../../../repositories/userRepository");

//helpers
const find_user_by_id = async (userId) => {
  const user = await userRepository.findById(userId);
  return user;
};

exports.createResumeTemplate = async (pdfBuffer, mimeType, userId) => {
  const ai = new GoogleGenAI({});
  const fileMimeType = mimeType || "application/pdf";
  try {
    const fileObject = new Blob([pdfBuffer], { type: fileMimeType });

    const file = await ai.files.upload({
      file: fileObject,
      mimeType: fileMimeType,
      displayName: "resume.pdf",
    });

    const prompt = `
      Structure this resume to match the JSON template below.
      If a field does not correspond, set it to null.
      Return a valid JSON object matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [
        {
          parts: [
            { text: prompt },
            { fileData: { mimeType: fileMimeType, fileUri: file.uri } },
          ],
        },
      ],
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: universalTemplate,
      },
    });

    const textOutput =
      response.output_text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    await ai.files.delete({ name: file.name });
    const jsonContent = JSON.parse(textOutput);
    const user = await find_user_by_id(userId);
    await saveJsonResumeToBucket(jsonContent, user.email);
    user.uploadedResume = true;
    userRepository.save(user);
    return JSON.parse(textOutput);
  } catch (error) {
    console.error("❌ Error creating resume template:", error);
    throw new Error("Failed to process resume with Google GenAI.");
  }
};

exports.createResumeJobAnalysis = async (job_description, userId) => {
  const user = await find_user_by_id(userId);
  const user_json_file = readJsonFileFromGCP(user.email);

  const ai = new GoogleGenAI({});
  try {
    const analysisPrompt = `
      You are an expert HR Analyst and Career Coach. Perform a detailed comparison
      between the provided Job Description (JD) and the applicant's Structured Resume JSON.

      **Job Description (JD):**
      ${job_description}
      **RESUME JSON**
      ${user_json_file}

      **CRITICAL INSTRUCTION:** Generate the complete analysis using the
      'job_match_analysis' schema/function. For the 'critical_missing_skills',
      simulate resource links (course, YouTube, keyword tip) as described in the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: [
        {
          parts: [{ text: analysisPrompt }],
        },
      ],
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: jobMatchStructure,
      },
    });

    const textOutput =
      response.output_text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    return JSON.parse(textOutput);
  } catch (error) {
    console.error("❌ Error creating job analysis:", error);
    throw new Error("Failed to process job analysis with Google GenAI.");
  }
};
exports.createTailoredResume = async (job_description, userId) => {
  const user = await find_user_by_id(userId);
  const user_json_file = readJsonFileFromGCP(user.email);
  const ai = new GoogleGenAI({});
  try {
    const resumeCreatorPrompt = `
    You are a LaTeX resume creator. Your task is to generate a new resume using the provided JSON resume data, tailoring it to match the given job description.

    **Job Description (JD):**
    ${job_description}

    **JSON Resume Data (JS):**
    ${user_json_file}

    **Target LaTeX Structure (LS):**
    ${latexStructure}

    **Instructions:**
    1. IT MUST BE ATS FRIENDLY
    2. Rephrase and reorganize the information from the JSON resume to align with the job description.
    3. Do NOT add any new information that is not present in the JSON data.
    4. Use the infomation in the JSON File and Override the info in the target LaTeX structure
    5. Follow the target LaTeX structure exactly. Only include fields present in the JSON; if a field is missing in the JSON, do not include it in the final resume.
    6. If the LaTeX structure requires additional fields for clarity or completeness, include them but only using data from the JSON.
    7. Ensure the output is a valid LaTeX resume that is optimized for the specified job.
    8.Do not add explanations or commentary—only write the resume text.
    9.!!Do not ADD COMMENTARY AND EXPLANATIONS TO NON OF TEXTS IN THE LATEX RESUME

    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: [
        {
          parts: [{ text: resumeCreatorPrompt }],
        },
      ],
      config: {
        temperature: 0.1,
      },
    });

    let textOutput =
      response.output_text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    const index = textOutput.indexOf("```") + 8;
    textOutput = textOutput.substring(index);
    const end = textOutput.indexOf("```");
    textOutput = textOutput.substring(0, end).trim();
    //console.log("uncleaned : ", cleanResume(textOutput));
    const cleanedLatex = cleanResume(textOutput);
    const res = await generatePDF(
      cleanedLatex,
      `${user.fullNames} ${user.surname}`,
      user.email,
      job_description
    );
    return res;
  } catch (error) {
    console.error("❌ Error creating job analysis:", error);
    throw new Error("Failed to process job analysis with Google GenAI.");
  }
};
const generatePDF = async (latex, fullname, email, job_description) => {
  const filename = fullname;
  try {
    const res = await axios.post(
      "https://resume.thewoo.online/gen-api/resume/generate",
      {
        fullName: filename,
        texContent: latex,
        email: email,
        job_description: job_description,
      }
    );

    if (res.status === 200 && res.data) {
      return {
        message: "Resume send to your email",
        status: res.status,
      };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        message:
          "Something went wrong during PDF generation. See console for details.",
        status: err.response?.status || "Network Error",
        error: err.message,
      };
    }
    return {
      message: "An unexpected client-side error occurred.",
      status: 500,
      error: err.message,
    };
  }
};
