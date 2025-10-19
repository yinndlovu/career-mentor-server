const { GoogleGenAI } = require("@google/genai");
const universalTemplate = require("../../../utils/universalTemplate");

exports.createResumeTemplate = async (pdfBuffer, mimeType) => {
  const ai = new GoogleGenAI({});
  const fileMimeType = mimeType || "application/pdf";

  console.log("Is PDF a Buffer?", Buffer.isBuffer(pdfBuffer));
  console.log("MIME Type:", fileMimeType);

  try {
    // ✅ Wrap buffer in File object
    const fileObject = new File([pdfBuffer], "resume.pdf", {
      type: fileMimeType,
    });

    const file = await ai.files.upload({
      file: fileObject,
      mimeType: fileMimeType,
      displayName: "resume.pdf",
    });

    const prompt = `
      Structure this resume to match the JSON template below.
      If a field does not correspond, set it to null.
      Return a valid JSON object matching this schema:
      ${JSON.stringify(universalTemplate)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: prompt },
            { fileData: { mimeType: fileMimeType, fileUri: file.uri } },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const createdResumeTemplate =
      response.output_text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      (await ai.files.delete({ name: file.name }));

    return JSON.parse(createdResumeTemplate);
  } catch (error) {
    console.error("❌ Error creating resume template:", error);
    throw new Error("Failed to process resume with Google GenAI.");
  }
};
