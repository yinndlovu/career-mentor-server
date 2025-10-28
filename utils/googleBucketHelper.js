const { Storage } = require("@google-cloud/storage");
const path = require("path");

const keyFilename = path.join(
  __dirname,
  "..",
  "cloud_keys",
  "thewoo-2cb2d5ae45cc.json"
);
const storage = new Storage({ keyFilename });
const bucketName = process.env.GCS_BUCKET_NAME;

exports.saveJsonResumeToBucket = async (jsonContent, email) => {
  try {
    const file = storage.bucket(bucketName).file(`${email}/resume.json`);
    await file.save(JSON.stringify(jsonContent), {
      contentType: "application/json",
    });
    console.log("✅ JSON data uploaded!");
  } catch (err) {
    console.log(err);
  }
};

exports.readJsonFileFromGCP = async (email) => {
  const [contents] = await storage
    .bucket(bucketName)
    .file(`${email}/resume.json`)
    .download();

  return contents.toString();
};
