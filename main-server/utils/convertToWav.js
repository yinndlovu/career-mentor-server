const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Convert any audio file to 16kHz mono WAV and save on the server
 * @param {string} inputPath - path to uploaded audio
 * @returns {Promise<string>} - path to converted WAV file
 */
async function convertToWav(inputPath) {
  // Save in a "converted" subfolder
  const convertedDir = path.join(__dirname, "converted");
  if (!fs.existsSync(convertedDir))
    fs.mkdirSync(convertedDir, { recursive: true });

  // Generate output filename
  const fileName =
    path.basename(inputPath, path.extname(inputPath)) + "_converted.wav";
  const outputPath = path.join(convertedDir, fileName);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-ac 1", // mono
        "-ar 16000", // 16 kHz
        "-f wav", // WAV format
      ])
      .save(outputPath)
      .on("end", () => {
        console.log(`✅ Audio converted and saved: ${outputPath}`);
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error("❌ Conversion failed:", err);
        reject(err);
      });
  });
}

module.exports = convertToWav;
