const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

console.log("[Brevo] Initializing Brevo API...");

// Validate API key exists
if (!process.env.BREVO_API_KEY) {
  console.error("[Brevo] ❌ CRITICAL ERROR: BREVO_API_KEY is not set!");
  throw new Error("BREVO_API_KEY environment variable is not configured");
}

console.log("[Brevo] API Key found:", process.env.BREVO_API_KEY.substring(0, 10) + "...");

// Configure Brevo API client
try {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  if (!defaultClient.authentications) {
    console.error("[Brevo] ❌ ApiClient authentications not found");
  }
  
  const apiKeyAuth = defaultClient.authentications['api-key'];
  if (!apiKeyAuth) {
    console.error("[Brevo] ❌ 'api-key' authentication method not found");
  }
  
  apiKeyAuth.apiKey = process.env.BREVO_API_KEY;
  console.log("[Brevo] ✅ API key configured successfully");
} catch (error) {
  console.error("[Brevo] ❌ Failed to configure API key:", error.message);
  throw error;
}

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

    console.log("[Brevo] Creating TransactionalEmailsApi instance...");
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    console.log("[Brevo] Creating SendSmtpEmail object...");
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = mailOptions.subject;
    sendSmtpEmail.htmlContent = mailOptions.html;
    sendSmtpEmail.sender = {
      name: "TakeCare",
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

    console.log("[Brevo] 📧 Sending email...");
    console.log("[Brevo]    To:", mailOptions.to);
    console.log("[Brevo]    Subject:", mailOptions.subject);
    console.log("[Brevo]    From:", sendSmtpEmail.sender.email);

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("[Brevo] ✅ Email sent successfully");
    console.log("[Brevo]    Message ID:", result.messageId);
    return result;
  } catch (error) {
    console.error("[Brevo] ❌ Failed to send email");
    console.error("[Brevo]    Error Message:", error.message);
    console.error("[Brevo]    Error Code:", error.code);
    
    if (error.response) {
      console.error("[Brevo]    Response Status:", error.response.status);
      console.error("[Brevo]    Response Body:", JSON.stringify(error.response.body, null, 2));
    }
    
    if (error.statusCode === 401) {
      console.error("[Brevo] ❌ AUTHENTICATION ERROR: Check your Brevo API key");
    }
    
    throw error;
  }
};

module.exports = {
  sendMail,
};
