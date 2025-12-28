import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import ErrorMessage from "./error";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await logIn(form);
      if (res.session?.isLogin) {
        navigate("/");
      } else {
        setErrorMessage(res.message || "Login failed");
      }
    } catch {
      setErrorMessage("Server error, please try again");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] p-4 relative overflow-hidden">

      {/* Floating soft circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulseSlow delay-5000"></div>

      {/* Card container */}
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/30 p-10 relative z-10">

        <h2 className="text-4xl font-extrabold text-teal-900 text-center mb-3 drop-shadow-md">
          Welcome Back
        </h2>
        <p className="text-center text-teal-800 mb-8 text-sm">
          Sign in to continue your dermatology & skincare journey
        </p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full px-5 py-3 rounded-xl bg-white/40 text-teal-900 placeholder-teal-500
                border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm"
            />

            {/* ✅ @ shows only when empty */}
            {!form.email && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2
                text-teal-500 font-semibold animate-pulse pointer-events-none">
                @
              </span>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-5 py-3 rounded-xl bg-white/40 text-teal-900 placeholder-teal-500
                border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500">
              🔒
            </span>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500
              text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-teal-700/80 mt-6 text-sm">
          New to TakeCare?
          <Link to="/signup" className="ml-1 text-teal-600 font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
