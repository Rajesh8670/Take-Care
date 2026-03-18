const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

// Validate API key exists
if (!process.env.BREVO_API_KEY) {
    console.error("❌ CRITICAL ERROR: BREVO_API_KEY is not set!");
    console.error("Make sure BREVO_API_KEY environment variable is configured.");
    process.exit(1);
}

console.log("\n=== Configuring Brevo API for Email ===");
console.log("✓ Brevo API Key: Set");
console.log("✓ Method: HTTP API (No SMTP ports needed)");
console.log("✓ From Email:", process.env.FROM_EMAIL);
console.log("=========================================\n");

// Configure Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

/**
 * Send email using Brevo API (no SMTP ports)
 * Works on Render free tier ✅
 */
const sendMail = async (mailOptions) => {
  try {
    // Validate mail options
    if (!mailOptions.to) {
      throw new Error("Recipient email (to) is required");
    }
    if (!mailOptions.subject) {
      throw new Error("Email subject is required");
    }
    if (!mailOptions.html) {
      throw new Error("Email HTML content is required");
    }

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // Set email details
    sendSmtpEmail.subject = mailOptions.subject;
    sendSmtpEmail.htmlContent = mailOptions.html;
    sendSmtpEmail.sender = {
      name: "TakeCare App",
      email: mailOptions.from || process.env.FROM_EMAIL,
    };
    sendSmtpEmail.to = [
      {
        email: mailOptions.to,
      },
    ];

    if (mailOptions.replyTo) {
      sendSmtpEmail.replyTo = {
        email: mailOptions.replyTo,
      };
    }

    console.log("📧 Sending email via Brevo API...");
    console.log("   To:", mailOptions.to);
    console.log("   Subject:", mailOptions.subject);

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully via Brevo API");
    console.log("   Message ID:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Failed to send email via Brevo API");
    console.error("   Error:", error.message);
    
    if (error.response) {
      console.error("   Response Status:", error.response.status);
      console.error("   Response Body:", JSON.stringify(error.response.body, null, 2));
    }
    
    throw error;
  }
};

module.exports = {
  sendMail,
};
