import React, { useState, useRef } from "react";
import { getPrediction } from "../../service/aiService";
import "./AIChat.css";

const AIChat = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, WebP)");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload and prediction
  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("📸 Sending image to AI...");
      const result = await getPrediction(selectedImage);

      if (result.success) {
        setPrediction(result.data);
        console.log("✅ Prediction received successfully");
      } else {
        setError(result.message || "Failed to get prediction");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear all data
  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <h1>🏥 AI Skin Disease Analyzer</h1>
        <p>Upload an image of your skin and get instant AI analysis</p>
      </div>

      <div className="ai-chat-content">
        {/* Image Upload Section */}
        <div className="upload-section">
          <div
            className="upload-box"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="preview-img" />
                <button className="change-btn" onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}>
                  Change Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📸</div>
                <h3>Click to upload image</h3>
                <p>or drag and drop</p>
                <p className="file-type">JPEG, PNG, WebP (Max 5MB)</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            hidden
          />

          {error && <div className="error-message">⚠️ {error}</div>}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="btn btn-analyze"
              onClick={handleUpload}
              disabled={!selectedImage || loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Analyzing...
                </>
              ) : (
                "🔍 Analyze Image"
              )}
            </button>

            {selectedImage && (
              <button className="btn btn-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Prediction Result Section */}
        {prediction && (
          <div className="prediction-section">
            <div className="result-card">
              <div className="result-header">
                <h2>✅ Analysis Results</h2>
                <div className="disclaimer">
                  <p className="disclaimer-text">
                    ⚠️ {prediction.disclaimer}
                  </p>
                </div>
              </div>

              {/* Main Prediction */}
              <div className="prediction-summary">
                <div className="prediction-main">
                  <h3 className="prediction-title">Detected Condition</h3>
                  <p className="prediction-name">{prediction.prediction}</p>
                  <div className="confidence">
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{
                          width: `${prediction.confidence_percentage}%`,
                        }}
                      ></div>
                    </div>
                    <p className="confidence-text">
                      Confidence: {prediction.confidence_percentage}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Advice */}
              <div className="result-section">
                <h3>💡 Medical Advice</h3>
                <p className="advice-text">{prediction.advice}</p>
              </div>

              {/* Medicines */}
              <div className="result-section">
                <h3>💊 Recommended Management</h3>
                <ul className="medicines-list">
                  {prediction.medicines && prediction.medicines.map((med, idx) => (
                    <li key={idx}>{med}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="result-actions">
                <button className="btn btn-primary" onClick={handleClear}>
                  Analyze Another Image
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  // TODO: Implement print functionality
                  window.print();
                }}>
                  📄 Print Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Analyzing your image with AI...</p>
              <p className="loading-hint">This may take a few seconds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
