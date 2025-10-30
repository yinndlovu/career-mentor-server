const { Storage } = require("@google-cloud/storage");

let storage;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  storage = new Storage();
} else if (process.env.GOOGLE_CLOUD_KEY_JSON) {
  const credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON);
  storage = new Storage({ credentials });
} else {
  throw new Error("Google Cloud credentials are not set.");
}

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
