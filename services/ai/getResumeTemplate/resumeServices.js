const { Blob } = require("buffer");
const { GoogleGenAI } = require("@google/genai");
const universalTemplate = require("../../../utils/universalTemplate");
const jobMatchStructure = require("../../../utils/jobMatchStructure");
const latexStructure = require("../../../utils/latexStructure");
const { cleanResume } = require("../../../utils/resumeCleaner");
const { default: axios } = require("axios");

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
exports.createTailoredResume = async (job_description, json_resume) => {
  const ai = new GoogleGenAI({});
  try {
    const resumeCreatorPrompt = `
You are a LaTeX resume creator. Your task is to generate a new resume using the provided JSON resume data, tailoring it to match the given job description.

**Job Description (JD):**
${job_description}

**JSON Resume Data (JS):**
${JSON.stringify(json_resume)}

**Target LaTeX Structure (LS):**
${latexStructure}

**Instructions:**
1. IT MUST BE ATS FRIENDLY
2. Rephrase and reorganize the information from the JSON resume to align with the job description. 
3. Do NOT add any new information that is not present in the JSON data.
4. Follow the target LaTeX structure exactly. Only include fields present in the JSON; if a field is missing in the JSON, omit it from the final resume.
5. If the LaTeX structure requires additional fields for clarity or completeness, include them but only using data from the JSON.
6. Ensure the output is a valid LaTeX resume that is optimized for the specified job.

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
    console.log("uncleaned : ", cleanResume(textOutput));
    const cleanedLatex = cleanResume(textOutput);
    const res = await generatePDF(cleanedLatex, "wanewa Netshodwe");
    return res;
  } catch (error) {
    console.error("❌ Error creating job analysis:", error);
    throw new Error("Failed to process job analysis with Google GenAI.");
  }
};
const generatePDF = async (latex, fullname) => {
  // Ensure the filename ends with .pdf
  const filename = fullname.endsWith(".pdf") ? fullname : fullname + ".pdf";

  try {
    // --- API Consumption ---
    const res = await axios.post(
      "http://localhost:6000/create",
      {
        fullName: filename,
        texContent: latex,
      },
      {
        // CRITICAL: Tell Axios to treat the response as binary data (Blob)
        responseType: "blob",
      }
    );

    if (res.status === 200 && res.data) {
      // 1. Create a Blob object from the response data
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });

      // 2. Create a temporary URL for the blob
      const downloadUrl = window.URL.createObjectURL(pdfBlob);

      // 3. Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename); // Set the desired filename

      // 4. Append and click the link to start the download
      document.body.appendChild(link);
      link.click();

      // 5. Clean up the temporary link and URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      console.log(
        `✅ PDF successfully generated and download started for: ${filename}`
      );
      return; // Success, return nothing
    } else {
      // Should be caught by the catch block, but included for safety
      return {
        message: "Received unexpected status code.",
        status: res.status,
        error: "Unexpected server response.",
      };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Handle HTTP errors returned by the server
      if (err.response && err.response.data) {
        // Since responseType was 'blob', we need to read the error message
        // from the error blob asynchronously to display a helpful message.
        // For a synchronous return, we'll return a generic error and log details.
        const errorBlob = err.response.data;
        const reader = new FileReader();

        // Log the details from the error response data
        reader.onload = function () {
          try {
            const errorData = JSON.parse(reader.result);
            console.error(
              "❌ API Compilation Error:",
              errorData.error,
              errorData.details
            );
          } catch (e) {
            console.error(
              "❌ API Error: Could not parse server error message."
            );
          }
        };
        reader.readAsText(errorBlob);
      }

      // Return the simplified error object as defined in your original snippet
      return {
        message:
          "Something went wrong during PDF generation. See console for details.",
        status: err.response?.status || "Network Error",
        error: err.message,
      };
    }
    // Handle non-Axios errors
    return {
      message: "An unexpected client-side error occurred.",
      status: 500,
      error: err.message,
    };
  }
};
