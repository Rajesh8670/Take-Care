const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");

// Check if SMTP credentials exist
if (!process.env.SMTP_EMAIL || !smtpPassword) {
    console.error("CRITICAL ERROR: SMTP_EMAIL and SMTP_PASSWORD are not set!");
    console.error("Make sure SMTP_EMAIL and SMTP_PASSWORD environment variables are configured.");
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: smtpPassword
    }
});

// Verify transporter connection
transporter.verify((error) => {
    if (error) {
        console.error("SMTP connection failed:", error.message);
    } else {
        console.log("SMTP server is ready to send emails");
    }
});

module.exports = transporter;
