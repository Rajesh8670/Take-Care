const nodemailer = require("nodemailer");
require("dotenv").config();

// Check if SMTP credentials exist
if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error("❌ CRITICAL ERROR: SMTP_EMAIL and SMTP_PASSWORD are not set!");
    console.error("Make sure SMTP_EMAIL and SMTP_PASSWORD environment variables are configured.");
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === "true" ? true : false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP connection failed:", error.message);
    } else {
        console.log("✅ SMTP server is ready to send emails");
    }
});

module.exports = transporter;
