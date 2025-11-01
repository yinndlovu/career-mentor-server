const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const speechKey = process.env.SPEECH_API_KEY;
const speechRegion = process.env.SPEECH_REGION;

module.exports = async (userId, audio_path) => {
  try {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      speechKey,
      speechRegion
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const pushStream = sdk.AudioInputStream.createPushStream();
    fs.createReadStream(audio_path)
      .on("data", (arrayBuffer) => {
        pushStream.write(arrayBuffer.slice());
      })
      .on("end", () => {
        pushStream.close();
      });

    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    var pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      "",
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );
    pronunciationAssessmentConfig.enableMiscue = true;
    pronunciationAssessmentConfig.enableProsodyAssessment = true;
    pronunciationAssessmentConfig.applyTo(recognizer);
    recognizer.recognizeOnceAsync((result) => {
      console.log(`Recognized text: ${result.text}`);
      console.log("da result : ", result);
      recognizer.close();
    });
  } catch (err) {
    console.log(err);
  }
};
