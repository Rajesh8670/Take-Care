// src/components/Features.jsx
import { Stethoscope, FileText, UserCheck, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  const navigate = useNavigate();
  const handleclick = (id) => {
    let url = "/";
    if (id == 1) url = "/ai-doctor";
    if (id == 2) url = "/health-reports";
    if (id == 3) url = "/consult-doctor";
    if (id == 4) url = "/pharmacy-home";
    navigate(url);
  };

  const items = [
    {
      icon: <Stethoscope size={28} />,
      id: 1,
      title: "AI Skin Doctor",
      text: "Upload an image or symptoms and get AI-powered dermatology insights.",
      btn: "Start Scan",
    },
    {
      icon: <FileText size={28} />,
      id: 2,
      title: "Health Reports",
      text: "Upload and analyze lab reports with AI-generated summaries.",
      btn: "View Reports",
    },
    {
      icon: <UserCheck size={28} />,
      id: 3,
      title: "Consult Doctor",
      text: "Connect with verified dermatologists for expert guidance.",
      btn: "Find Doctor",
    },
    {
      icon: <ShoppingCart size={28} />,
      id: 4,
      title: "Online Pharmacy",
      text: "Buy dermatologist-recommended medicines securely.",
      btn: "Buy Medicine",
    },
  ];

  return (
    <section className="mt-20 px-6">
      <h2 className="text-3xl font-bold text-center text-[#264653]">
        Everything You Need for Skin Care
      </h2>

      <motion.div
        className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map((f, i) => (
          <motion.div
            key={i}
            className="
              group relative rounded-3xl p-[2px]
              bg-gradient-to-br from-[#0BAF8C] via-[#7ae0d0] to-[#e6f7f5]
              transition-all duration-300
            "
            variants={itemVariants}
            onClick={()=>{handleclick(f.id)}}
          >
            {/* Glow ring */}
            <div
              className="
                absolute inset-0 rounded-3xl
                opacity-0 blur-md
                bg-gradient-to-br from-[#0BAF8C] to-[#7ae0d0]
                group-hover:opacity-60
                transition duration-300
              "
            ></div>

            {/* Inner Card */}
            <div
              className="
                relative z-10 h-full rounded-3xl p-6
                bg-[#f4fbfa]
                border border-white/70
                transition-all duration-300
                group-hover:-translate-y-4
                group-hover:bg-gradient-to-br
                group-hover:from-[#d9f5f1]
                group-hover:to-[#ffffff]
                group-hover:shadow-2xl
              "
            >
              {/* Icon */}
              <div
                className="
                  w-12 h-12 flex items-center justify-center
                  rounded-xl bg-[#e0f7f4]
                  text-[#0BAF8C]
                  mb-4
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                {f.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#264653]">
                {f.title}
              </h3>

              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {f.text}
              </p>

              <button
                className="
                  mt-6 w-full py-2 rounded-full
                  border border-[#0BAF8C]
                  text-[#0BAF8C] font-medium text-sm
                  transition-all duration-300
                  group-hover:bg-[#0BAF8C]
                  group-hover:text-white
                  shadow-sm
                "
              >
                {f.btn}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
