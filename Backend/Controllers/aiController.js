const axios = require("axios");
const fs = require("fs/promises");
const FormData = require("form-data");

const PREDICTION_API =
  process.env.AI_PREDICTION_API ||
  "https://hawktherock-take-care-backend.hf.space/predict";

const removeUploadedFile = async (filePath) => {
  if (!filePath) {
    return;
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.warn("Could not delete uploaded AI image:", error.message);
  }
};

const getPrediction = async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    console.log("Processing AI prediction for file:", req.file.filename);

    const fileBuffer = await fs.readFile(filePath);
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    console.log("Forwarding image to AI prediction API...");
    const response = await axios.post(PREDICTION_API, form, {
      headers: form.getHeaders(),
      timeout: 30000,
      maxBodyLength: Infinity,
    });

    const predictionData = response.data || {};

    if (
      typeof predictionData.prediction === "undefined" ||
      typeof predictionData.confidence === "undefined"
    ) {
      return res.status(502).json({
        success: false,
        message: "Prediction API returned an unexpected response",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        prediction: predictionData.prediction,
        confidence: predictionData.confidence,
        confidence_percentage: (
          Number(predictionData.confidence) * 100
        ).toFixed(2),
        advice:
          predictionData.advice ||
          "Keep the affected area clean and consult a dermatologist if symptoms continue.",
        medicines: Array.isArray(predictionData.medicines)
          ? predictionData.medicines
          : [],
        disclaimer:
          predictionData.disclaimer ||
          "AI guidance is informational only and not a medical diagnosis.",
      },
      message: "Prediction successful",
    });
  } catch (error) {
    console.error("AI prediction failed:", error.message);

    if (error.response) {
      console.error("Prediction API status:", error.response.status);
      console.error("Prediction API body:", error.response.data);

      return res.status(error.response.status || 502).json({
        success: false,
        message: "Error from prediction API",
        error: error.response.data?.message || error.message,
      });
    }

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message: "Prediction API timeout - Please try again",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get prediction",
      error: error.message,
    });
  } finally {
    await removeUploadedFile(filePath);
  }
};

const getChatHistory = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Chat history feature coming soon",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

const savePredictionResult = async (req, res) => {
  try {
    return res.status(201).json({
      success: true,
      message: "Prediction result saved",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save prediction",
      error: error.message,
    });
  }
};

module.exports = {
  getPrediction,
  getChatHistory,
  savePredictionResult,
};
