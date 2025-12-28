import React from "react";
import { motion } from "framer-motion";
import style from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  const navigate=useNavigate();
  return (
    <div
      className={`
        w-full min-h-[65vh] flex items-center justify-between
        max-[900px]:justify-center
        ${style.heroContainer}
      `}
    >
      {/* LEFT SIDE TEXT */}
      <motion.div
        className="
          w-[55%] m-10 flex flex-col gap-6
          items-start text-left
          max-[900px]:mt-[20vh]
          max-[900px]:w-[90%]
          max-[900px]:items-center
          max-[900px]:text-center
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-[#264653] leading-tight"
        >
          AI-Powered Skin Analysis
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 max-w-xl"
        >
          Upload a photo or describe your skin concern.
          Our AI analyzes symptoms instantly and provides
          reliable care recommendations.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-500"
        >
          ✔ Secure & Private &nbsp; ✔ Medical-grade AI &nbsp; ✔ Instant Results
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button
            className="
              mt-4 px-8 py-3 
              bg-[#0BAF8C] text-white 
              rounded-full font-medium
              shadow-lg hover:bg-[#089f7f]
              transition-all duration-300
            "
            onClick={()=>navigate("/ai-doctor")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(11, 175, 140, 0.4)",
                "0 0 0 15px rgba(11, 175, 140, 0)",
              ],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
          >
            Start AI Skin Analysis
          </motion.button>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className="
          w-[40%] h-[65vh] flex justify-center align-text-bottom
          max-[900px]:hidden
        "
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/scan-img2.png"
          alt="Doctor"
          className="w-full h-full scale-100"
        />
      </div>
    </div>
  );
};

export default Hero;
