import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./error";

export default function PasswordResetEmail() {
  const { setSignupData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const res = await setSignupData({ email, page: "resetPassword" });

    if (res.status === 201) {
      navigate("/verify-otp", {
        replace: true,
        state: {
          page: "resetPassword",
        },
      });
    } else {
      setErrorMessage(res.message || "Failed to send OTP");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 p-6 relative overflow-hidden">
      {/* Background floating circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulseSlow delay-5000"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 animate-fadeIn">
        <h2 className="text-4xl font-bold text-teal-900 text-center mb-4 drop-shadow-md tracking-wide">
          Forgot Password?
        </h2>
        <p className="text-teal-800 text-center mb-8 text-sm font-medium">
          Enter your email and we’ll send you a one-time passcode to reset your password.
        </p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block font-semibold text-teal-900 mb-2 text-sm">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full px-5 py-3 bg-white border border-teal-300 placeholder-teal-500 text-teal-900 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition shadow-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-[1.03] hover:shadow-2xl"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-teal-700/80 text-sm mb-3">Remember your password?</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full text-teal-900 font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></span>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
