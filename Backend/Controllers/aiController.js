const axios = require("axios");
const fs = require("fs/promises");

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const analysisSchema = {
  type: "object",
  properties: {
    prediction: { type: "string" },
    confidence: { type: "number" },
    observedSigns: { type: "array", items: { type: "string" } },
    advice: { type: "string" },
    urgency: { type: "string" },
    medicines: { type: "array", items: { type: "string" } },
    medicineTiming: { type: "array", items: { type: "string" } },
    whenToSeeDoctor: { type: "string" },
    disclaimer: { type: "string" },
  },
  required: [
    "prediction",
    "confidence",
    "observedSigns",
    "advice",
    "urgency",
    "medicines",
    "medicineTiming",
    "whenToSeeDoctor",
    "disclaimer",
  ],
};

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

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "Gemini AI is not configured. Set GEMINI_API_KEY on the backend.",
      });
    }

    const fileBuffer = await fs.readFile(filePath);
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze this image for visible skin concerns. Return only valid JSON matching the provided schema.

Rules:
- If the image is not a clear skin image, set prediction to "Image not suitable for analysis" and explain that in advice.
- This is educational triage, not a diagnosis. Never claim certainty.
- Recommend only general, low-risk supportive care or clearly label over-the-counter options. Do not recommend prescription medicine or a personalized dose.
- For every medicine or product, include practical timing or frequency in medicineTiming, and say to follow the product label or clinician instructions.
- Mention urgent red flags such as breathing difficulty, facial swelling, rapidly spreading rash, severe pain, fever, pus, or eye involvement.
- Confidence must be a number from 0 to 1.`,
              },
              {
                inline_data: {
                  mime_type: req.file.mimetype,
                  data: fileBuffer.toString("base64"),
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
        },
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        timeout: 60000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const responseText = response.data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!responseText) {
      throw new Error("Gemini returned an empty analysis");
    }

    const predictionData = JSON.parse(responseText);
    const confidence = Math.min(
      1,
      Math.max(0, Number(predictionData.confidence) || 0)
    );

    return res.status(200).json({
      success: true,
      data: {
        prediction: predictionData.prediction,
        confidence,
        confidence_percentage: (confidence * 100).toFixed(2),
        observedSigns: Array.isArray(predictionData.observedSigns)
          ? predictionData.observedSigns
          : [],
        advice: predictionData.advice,
        urgency: predictionData.urgency,
        medicines: Array.isArray(predictionData.medicines)
          ? predictionData.medicines
          : [],
        medicineTiming: Array.isArray(predictionData.medicineTiming)
          ? predictionData.medicineTiming
          : [],
        whenToSeeDoctor: predictionData.whenToSeeDoctor,
        disclaimer:
          predictionData.disclaimer ||
          "This is educational information, not a medical diagnosis or prescription.",
      },
      message: "Prediction successful",
    });
  } catch (error) {
    console.error("AI prediction failed:", error.message);

    if (error.response) {
      console.error("Gemini API status:", error.response.status);
      console.error("Gemini API body:", error.response.data);

      return res.status(error.response.status === 429 ? 503 : 502).json({
        success: false,
        message: "Gemini could not analyze this image",
        error:
          error.response.data?.error?.message ||
          "Please try again in a moment.",
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
      message: "Failed to analyze image",
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
