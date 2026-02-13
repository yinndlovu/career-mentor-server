const multer = require("multer");

const storage = multer.memoryStorage();

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    const error = new Error("Invalid file type. Only PDF files are allowed.");
    error.code = "INVALID_MIME_TYPE";
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("pdf");

exports.pdfUploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return handleMulterError(err, res);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file selected for upload.",
      });
    }
    next();
  });
};

function handleMulterError(err, res) {
  switch (err.code) {
    case "INVALID_MIME_TYPE":
      return res.status(400).json({ success: false, message: err.message });
    case "LIMIT_FILE_SIZE":
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB.",
      });
    default:
      return res.status(500).json({
        success: false,
        message: `Upload failed: ${err.message}`,
      });
  }
}
