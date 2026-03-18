const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(uploadsDir, "reports");
    
    // Create reports directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    console.log("📁 Multer destination:", dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${sanitizedName}`;
    
    console.log("📄 Multer filename:", filename);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("🔍 Filtering file:", file.originalname, "Type:", file.mimetype);
  
  // Accept all file types for health reports
  // (PDF, images, Word docs, etc.)
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024  // 50MB max
  }
});

module.exports = upload;
