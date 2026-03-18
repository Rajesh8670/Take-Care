const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const HealthReport = require("../model/HealthReport");
const fs = require("fs");
const path = require("path");

router.post(
  "/upload-report",
  auth,
  upload.single("report"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { userId } = req.user;
      const { filename, mimetype } = req.file;

      console.log("📁 Upload Report Details:");
      console.log("User ID:", userId);
      console.log("File Object:", {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      });

      const userUploadsDir = path.join(__dirname, "..", "uploads", "reports", userId);
      if (!fs.existsSync(userUploadsDir)) {
        fs.mkdirSync(userUploadsDir, { recursive: true });
        console.log("✓ Created user uploads directory:", userUploadsDir);
      }

      const newFilePath = path.join(userUploadsDir, req.file.filename);
      console.log("📋 Moving file from:", req.file.path, "to:", newFilePath);
      
      fs.renameSync(req.file.path, newFilePath);
      console.log("✓ File moved successfully");

      const newReport = new HealthReport({
        userId,
        fileName: req.file.originalname,
        fileType: mimetype,
        fileUrl: `/uploads/reports/${userId}/${req.file.filename}`,
      });

      await newReport.save();
      console.log("✓ Report saved to database:", newReport._id);

      res.status(201).json({
        message: "Report uploaded successfully",
        report: newReport,
      });
    } catch (error) {
      console.error("❌ Error uploading report:", error);
      res.status(500).json({ 
        message: "Server error", 
        error: error.message 
      });
    }
  }
);

// Add a route to get reports for a user
router.get("/reports", auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const reports = await HealthReport.find({ userId });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a report
router.delete("/reports/:id", auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const report = await HealthReport.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Ensure the user owns this report
    if (report.userId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own reports" });
    }

    // Construct the full file path to the report on the server
    const filePath = path.join(__dirname, "..", report.fileUrl);

    // Asynchronously delete the file
    fs.unlink(filePath, async (err) => {
      if (err) {
        // Log the error, but proceed to delete the database record anyway.
        // This prevents orphan records if the file is already gone or there's a permission issue.
        console.error(`Failed to delete file: ${filePath}`, err);
      }

      // Delete the report from the database
      await HealthReport.findByIdAndDelete(id);

      res.status(200).json({ message: "Report deleted successfully" });
    });

  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;