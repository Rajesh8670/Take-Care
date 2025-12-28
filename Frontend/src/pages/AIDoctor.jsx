import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Send,
  MessageSquare,
  Stethoscope,
  ArrowLeft,
  Loader2,
  X,
  Moon,
  Sun
} from "lucide-react";

const AIDoctor = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Dermatology Assistant. Please describe your skin concern or upload an image for analysis.",
      sender: "ai",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  /* ✅ REAL DARK MODE */
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleSendMessage = () => {
    if (!inputText.trim() && !uploadedImage) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: uploadedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setUploadedImage(null);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text:
            "Based on your symptoms, this may be a mild dermatological condition.\n\nPossible causes:\n• Contact dermatitis\n• Eczema\n• Allergic reaction\n\nRecommended steps:\n1. Keep the area clean\n2. Avoid irritants\n3. Use gentle moisturizer\n\n⚠️ AI advice is informational only."
        }
      ]);
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="
        min-h-screen p-4 md:p-8 transition-colors
        bg-gradient-to-br from-blue-100 via-sky-100 to-emerald-100
        dark:from-gray-900 dark:to-black
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2 rounded-full
              bg-gradient-to-r from-blue-500 to-emerald-500
              text-white font-semibold shadow-lg
              hover:scale-105 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-105 transition"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>
        </div>

        {/* HEADER */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl shadow">
              <Stethoscope className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Derma AI Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered dermatology consultation
              </p>
            </div>
          </div>
        </header>

        {/* CHAT CARD */}
        <div className="rounded-2xl shadow-xl overflow-hidden
          bg-blue-50 dark:bg-gray-900
        ">
          {/* MESSAGES */}
          <div className="h-[520px] overflow-y-auto p-6 space-y-6
            bg-blue-100/60 dark:bg-gray-800
          ">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm
                    ${msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white/80 dark:bg-gray-700 dark:text-white border"
                    }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="uploaded" className="mb-2 rounded-lg max-h-48" />
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-xs opacity-70 block mt-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Loader2 className="animate-spin w-4 h-4" />
                AI is analyzing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* IMAGE PREVIEW */}
          {uploadedImage && (
            <div className="px-4 py-2 flex items-center gap-3
              bg-emerald-100 dark:bg-gray-700
            ">
              <img src={uploadedImage} className="w-12 h-12 rounded-lg object-cover" />
              <span className="text-sm text-emerald-800 dark:text-emerald-300">
                Image selected
              </span>
              <button onClick={() => setUploadedImage(null)}>
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}

          {/* INPUT */}
          <div className="p-4 border-t flex gap-2
            bg-blue-50 dark:bg-gray-900 dark:border-gray-700
          ">
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-3 rounded-lg bg-blue-100 dark:bg-gray-700 hover:scale-105 transition"
            >
              <Camera />
            </button>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms..."
              rows={2}
              className="flex-1 border rounded-lg p-3 resize-none
                bg-white/80 dark:bg-gray-800 dark:text-white
                focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSendMessage}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:scale-105 transition"
            >
              <Send />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* NOTICE */}
        <div className="mt-6 rounded-xl shadow p-4 text-sm
          bg-blue-50 text-gray-700
          dark:bg-gray-900 dark:text-gray-400
        ">
          ⚠️ AI guidance is informational only. Always consult a certified dermatologist.
        </div>
      </div>
    </div>
  );
};

export default AIDoctor;
