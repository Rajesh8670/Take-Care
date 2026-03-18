import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ErrorMessage from "./error";

const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createAccount } = useContext(AuthContext);

  const emailFromState =
    location.state?.email ||
    sessionStorage.getItem("verifiedOtpEmail") ||
    "";

  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: emailFromState, // ✅ email stays in state
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all required fields.");
    }
    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters.");
    }

    try {
      const res = await createAccount(formData);
      if (res?.status === 201) {
        sessionStorage.removeItem("verifiedOtpEmail");
        navigate("/login", { replace: true });
      } else {
        setErrorMessage(res?.message || "Account creation failed.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 sm:px-6">
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='p' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpath d='M15 0L30 15L15 30L0 15Z' fill='none' stroke='%2304a3a9' stroke-width='0.4' stroke-opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Blobs */}
      <div className="hidden sm:block absolute -top-24 -left-24 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white">
        
        {/* Header */}
        <div className="px-6 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 text-center bg-gradient-to-r from-teal-100/50 to-blue-100/50">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
            </svg>
          </div>

          <h1 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">
            TakeCare
          </h1>
          <p className="mt-2 text-gray-600 text-xs sm:text-sm">
            Create your dermatology care account
          </p>
        </div>

        {errorMessage && (
          <div className="px-6 sm:px-8 mt-4">
            <ErrorMessage message={errorMessage} />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-5">
          
          {/* ✅ Hidden Email Field */}
          <input type="hidden" name="email" value={formData.email} />

          {[
            { label: "Full Name", name: "fullname", type: "text", placeholder: "John Doe" },
            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-blue-700 transition-all"
          >
            Create Account
          </button>

          <div className="pt-4 border-t text-xs sm:text-sm text-gray-600 text-center">
            AI Skin Analysis • Dermatologist Advice • Secure Reports
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 sm:py-6 bg-gray-50 text-center text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
