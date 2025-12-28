import React from "react";

const UploadSection = () => {
  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/30 animate-fade">
        
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
          Upload Image or Describe Your Skin Problem
        </h2>

        <div className="flex flex-col gap-6">
          {/* Image Upload */}
          <label
            className="border-2 border-dashed border-sky-400 rounded-2xl p-8 text-center cursor-pointer hover:bg-sky-50 transition shadow"
          >
            <input type="file" className="hidden" />
            <p className="text-slate-700">
              Click to upload image
            </p>
          </label>

          {/* Text Input */}
          <textarea
            className="w-full min-h-32 p-5 rounded-2xl border border-slate-300 shadow focus:outline-sky-400"
            placeholder="Describe your skin issue..."
          />

          <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl shadow-xl hover:scale-105 transition">
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
