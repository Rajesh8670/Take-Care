const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");

// Check if SMTP credentials exist
if (!process.env.SMTP_EMAIL || !smtpPassword) {
    console.error("❌ CRITICAL ERROR: SMTP_EMAIL and SMTP_PASSWORD are not set!");
    console.error("Make sure SMTP_EMAIL and SMTP_PASSWORD environment variables are configured.");
}

console.log("\n=== Configuring SMTP Transporter for Brevo ===");
console.log("✓ SMTP Host:", process.env.SMTP_HOST);
console.log("✓ SMTP Port:", process.env.SMTP_PORT);
console.log("✓ SMTP Auth Email:", process.env.SMTP_EMAIL);
console.log("✓ Verified Sender:", process.env.FROM_EMAIL);
console.log("✓ TLS Encryption: Enabled");
console.log("=============================================\n");

// Create a nodemailer transporter for Brevo SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: smtpPassword
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP Connection Failed:", error.message);
    } else {
        console.log("✅ SMTP server is ready to send emails via Brevo\n");
    }
});

module.exports = transporter;
