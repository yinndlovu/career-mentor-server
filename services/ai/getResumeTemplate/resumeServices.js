
const { Blob } = require("buffer");
const { GoogleGenAI } = require("@google/genai");
const universalTemplate = require("../../../utils/universalTemplate");
const jobMatchStructure = require("../../../utils/jobMatchStructure");

exports.createResumeTemplate = async (pdfBuffer, mimeType) => {
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

    return JSON.parse(textOutput);
  } catch (error) {
    console.error("❌ Error creating resume template:", error);
    throw new Error("Failed to process resume with Google GenAI.");
  }
};

exports.createResumeJobAnalysis = async (job_description, json_resume) => {
  const ai = new GoogleGenAI({});
  try {
    const analysisPrompt = `
      You are an expert HR Analyst and Career Coach. Perform a detailed comparison
      between the provided Job Description (JD) and the applicant's Structured Resume JSON.

      **Job Description (JD):**
      ${job_description}
      **RESUME JSON**
      ${JSON.stringify(json_resume)}

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
