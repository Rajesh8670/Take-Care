import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userName = user?.fullname || "User";
  const userEmail = user?.email || "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-cyan-200 to-teal-300"
    >
      
      {/* Glass Card Border */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative w-full max-w-sm rounded-3xl p-[1.5px]
                      bg-gradient-to-br from-white/40 to-white/10 shadow-2xl"
      >

        {/* Glass Card */}
        <div className="relative rounded-3xl bg-white/20 backdrop-blur-2xl
                        border border-white/30 p-8 text-center">

          {/* Home Icon */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 p-2 rounded-full
                       bg-white/30 backdrop-blur-md
                       border border-white/40
                       text-gray-900 shadow-md
                       transition-all duration-300
                       hover:bg-white/50 hover:scale-110"
            aria-label="Go to Home"
          >
            <Home size={20} />
          </button>

          {/* Soft Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
                          from-white/20 to-transparent opacity-50 pointer-events-none" />

          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-wide">
            Profile
          </h2>

          {/* Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 mx-auto mb-6 rounded-full
                          bg-gradient-to-br from-teal-400 via-blue-500 to-purple-500
                          flex items-center justify-center shadow-xl
                          ring-4 ring-white/40">
            <span className="text-6xl font-extrabold text-white drop-shadow-md">
              {userInitial}
            </span>
          </motion.div>

          {/* User Info */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {userName}
            </h3>

            <p className="text-sm text-gray-700 mt-1 mb-6">
              {userEmail}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r
                          from-transparent via-white/60 to-transparent mb-6" />

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl
                       bg-gradient-to-r from-red-500 to-rose-500
                       text-white font-semibold
                       border border-white/30
                       shadow-lg transition-all duration-300
                       hover:from-red-600 hover:to-rose-600
                       hover:shadow-2xl
                       active:scale-95
                       flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
