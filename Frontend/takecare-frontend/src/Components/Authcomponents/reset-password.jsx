import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "./error";
import { AuthContext } from "../../store/AuthContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { resetAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMessage("Password mismatch! Please try again.");
      return;
    }
    const res = await resetAuth({
      email: location.state.email,
      password,
    });

    if (res.status === 201) {
      navigate("/");
    } else {
      setErrorMessage(res.message);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-teal-200 to-blue-100 p-5 relative overflow-hidden">

      {/* Animated background circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulseSlow delay-5000"></div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/30 p-8 relative z-10">
        <h2 className="text-4xl font-bold text-teal-900 text-center mb-2 drop-shadow-md">
          Create New Password
        </h2>
        <p className="text-center text-teal-800 mb-8 text-sm">
          Choose a strong password for your account
        </p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password field */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-5 py-3 rounded-xl bg-white/40 text-teal-900 placeholder-teal-500 border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-700/70 hover:text-teal-900 transition"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm password field */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-5 py-3 rounded-xl bg-white/40 text-teal-900 placeholder-teal-500 border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-700/70 hover:text-teal-900 transition"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl 
              bg-gradient-to-r from-teal-500 to-blue-500 
              text-white font-semibold shadow-lg 
              hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-sm text-teal-700/80 mt-6">
          Remember your password?
          <Link
            to="/login"
            className="ml-1 text-teal-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
