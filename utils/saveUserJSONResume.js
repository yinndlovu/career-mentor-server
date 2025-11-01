const fs = require("fs").promises;
const path = require("path");

module.exports = async function saveUserJSONResume(user_email, jsonContent) {
  const folder_path = path.join(__dirname, "..", "JsonResumes");
  const file_path = path.join(folder_path, `${user_email}.json`);
  try {
    await fs.mkdir(folder_path, { recursive: true });
    await fs.writeFile(file_path, jsonContent);
    console.log("✅ File saved at:", file_path);
  } catch (err) {
    console.error("❌ Error saving file:", err);
  }
  return file_path;
};
