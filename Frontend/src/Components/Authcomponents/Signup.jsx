import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { useContext, useState } from "react";
import ErrorMessage from "./error";
import { Home } from "lucide-react";

const Signup = () => {
  const { setSignupData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const res = await setSignupData({ email, page: "signUp" });

    if (res.status === 201) {
      navigate("/verify-otp", {
        replace: true,
        state: { page: "signUp", email },
      });
    } else setErrorMessage(res.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] p-6 relative overflow-hidden">

      <Link to="/" className="absolute top-8 left-8 z-20 text-teal-800 hover:text-teal-600 transition-colors" aria-label="Go to Homepage">
        <Home size={32} />
      </Link>

      {/* Floating soft circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulseSlow delay-5000"></div>

      {/* Card container */}
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/30 
        rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 relative z-10">

        <h2 className="text-4xl font-extrabold text-teal-900 text-center mb-3 drop-shadow-md">
          Create Account
        </h2>
        <p className="text-center text-teal-800 mb-8 text-sm">
          Join TakeCare for smarter dermatology & skincare management
        </p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full px-5 py-3 rounded-xl bg-white/40 text-teal-900 placeholder-teal-500
                border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm"
            />

            {/* ✅ Show @ ONLY when input is empty */}
            {!email && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 
                text-teal-500 font-semibold animate-pulse pointer-events-none">
                @
              </span>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500
              text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-teal-700/80 text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
