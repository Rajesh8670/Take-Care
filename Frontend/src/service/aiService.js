import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");
const AI_API = `${API_BASE_URL}/api/ai`;

export const getPrediction = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(`${AI_API}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.error ||
          error.response.data?.message ||
          `Error: ${error.response.status} - ${error.response.statusText}`
      );
    }

    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }

    throw new Error("Failed to connect to AI backend");
  }
};

export const getChatHistory = async () => {
  const response = await axios.get(`${AI_API}/history`);
  return response.data;
};

export const savePredictionResult = async (result) => {
  const response = await axios.post(`${AI_API}/save-result`, result);
  return response.data;
};

export default {
  getPrediction,
  getChatHistory,
  savePredictionResult,
};
