import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const { verifyOtp, setSignupData } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1].focus();
    if (!value && index > 0) inputRefs.current[index - 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setSignupData({
      email: location.state.email,
      page: location.state.page,
    });
    setResendTimer(30);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 4) return alert("Enter valid OTP");

    setIsLoading(true);
    try {
      const res = await verifyOtp(finalOtp);
      if (res?.isVerified) {
        navigate(
          location.state.page === "signUp"
            ? "/create-account"
            : "/reset-Password",
          { replace: true, state: { email: res.email } }
        );
      } else {
        setOtp(["", "", "", ""]);
        inputRefs.current[0].focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-blue-200">

      {/* background blobs (hidden on small screens) */}
      <div className="hidden sm:block absolute top-10 right-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div className="hidden sm:block absolute bottom-10 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">
            Enter Verification Code
          </h1>

          {location.state?.email && (
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              {location.state.email}
            </p>
          )}
        </div>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus={index === 0}
                className="
                  w-12 h-12 text-2xl
                  sm:w-16 sm:h-16 sm:text-3xl
                  text-center font-bold
                  border-2 border-gray-200 rounded-xl
                  focus:border-teal-500 focus:ring-4 focus:ring-teal-100
                  outline-none transition"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || otp.some(d => !d)}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-xl transition"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Ready to resend"}
          </p>

          <button
            disabled={resendTimer > 0}
            onClick={handleResendOtp}
            className="text-sm font-semibold text-teal-600 disabled:text-gray-400"
          >
            Resend OTP
          </button>

          <p className="text-sm text-gray-500">
            Back to{" "}
            <button onClick={() => navigate("/login")} className="text-teal-600 font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
