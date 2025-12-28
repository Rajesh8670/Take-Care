import React from "react";

const Footer = () => {
  return (
<footer
  className="
    mt-24 px-16 py-14
    bg-gradient-to-br from-[#e6f7f5] via-[#f3fbfa] to-[#ffffff]
    backdrop-blur-xl
    border-t border-[#cdeeed]
    shadow-[0_-12px_30px_rgba(0,0,0,.10)]
  "
>
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-[#003c3a]">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-[#264653] mb-3">
            TakeCare
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            AI-powered dermatology assistant providing fast, secure,
            and reliable skin health insights anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-[#264653]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#0BAF8C] cursor-pointer">Home</li>
            <li className="hover:text-[#0BAF8C] cursor-pointer">AI Skin Check</li>
            <li className="hover:text-[#0BAF8C] cursor-pointer">Health Reports</li>
            <li className="hover:text-[#0BAF8C] cursor-pointer">Consult Doctor</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3 text-[#264653]">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Skin Image Analysis</li>
            <li>Symptom-Based Diagnosis</li>
            <li>Medicine Recommendations</li>
            <li>Dermatology Consultations</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3 text-[#264653]">Legal & Safety</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Medical Disclaimer</li>
            <li>Data Security</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-white/30"></div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 gap-4">
        <p>
          © 2025 <span className="font-medium text-[#264653]">TakeCare</span>.
          All rights reserved.
        </p>

        <p className="text-center md:text-right">
          Not a replacement for professional medical advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
