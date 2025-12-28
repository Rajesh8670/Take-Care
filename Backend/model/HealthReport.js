const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  fileUrl: String,
  fileName: String,
  fileType: String,

  aiResult: {
    type: String,
    default: null
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("HealthReport", HealthReportSchema);