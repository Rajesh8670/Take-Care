import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { AuthContext } from "../../store/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { isLogin, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBelow800 = width <= 1100;
  const isBelow450 = width <= 600;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile-card");
  };

  return (
    <nav
      className="
        w-full flex justify-between items-center px-12 py-4
        bg-white/10 backdrop-blur-2xl
        border-b border-white/30
        shadow-[0_2px_12px_rgba(0,0,0,0.03)]
        fixed top-0 z-50
      "
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-1">
        <div className={`w-10 h-10 overflow-hidden rounded-lg ${style.appLogo}`}>
          <img
            src="/app-logo1.png"
            className="w-full h-full object-contain"
            style={{ transform: "scale(2.2)" }}
            alt="TakeCare Logo"
          />
        </div>

        <h1 className="text-2xl font-semibold text-[#264653] tracking-tight">
          Take Care
        </h1>
      </Link>

      {/* MENU */}
      {!isBelow450 && (
        <div className="flex gap-7 items-center text-[15px] text-[#003c3a] font-medium">
          <Link to="/" className="hover:text-[#0BAF8C] transition">
            Home
          </Link>

          <Link to="/ai-doctor" className="hover:text-[#0BAF8C] transition">
            AI Doctor
          </Link>

          {!isBelow800 && (
            <>
              <Link to="/health-reports" className="hover:text-[#0BAF8C] transition">
                Health Reports
              </Link>

              <Link to="/consult-doctor" className="hover:text-[#0BAF8C] transition">
                Consult Doctor
              </Link>
            </>
          )}

          <Link to="/pharmacy-home" className="hover:text-[#0BAF8C] transition">
            Pharmacy
          </Link>
        </div>
      )}

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-6">
        {isLogin ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer
                         ring-2 ring-offset-2 ring-offset-transparent ring-transparent
                         hover:ring-[#0BAF8C] transition-all duration-300"
            >
              <span className="text-lg font-semibold text-gray-600">{isLogin && user && user.fullname ? user.fullname.charAt(0).toUpperCase() : <User className="w-6 h-6 text-gray-600" />}</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-[#003c3a] hover:text-[#0BAF8C] transition font-medium"
          >
            Log In
          </Link>
        )}

        {!isBelow800 && !isLogin && (
          <Link
            to="/signup"
            className="
              px-5 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full
              shadow-md hover:shadow-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 font-medium
            "
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
