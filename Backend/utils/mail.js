const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const brevoApiKey = (process.env.BREVO_API_KEY || "").trim();
const fromEmail = (process.env.FROM_EMAIL || "").trim();

const isBrevoKeyConfigured =
  brevoApiKey.startsWith("xkeysib-") && !brevoApiKey.includes("${");
const isSenderConfigured =
  fromEmail.includes("@") && !fromEmail.includes("${");

if (!isBrevoKeyConfigured) {
  console.error("CRITICAL ERROR: BREVO_API_KEY is missing or invalid.");
  console.error("Key provided:", brevoApiKey ? `${brevoApiKey.substring(0, 20)}...` : "EMPTY");
}

if (!isSenderConfigured) {
  console.error("CRITICAL ERROR: FROM_EMAIL is missing or invalid.");
  console.error("Email provided:", fromEmail || "EMPTY");
}

console.log("\n=== Configuring Brevo API for Email ===");
console.log(`Brevo API Key: ${isBrevoKeyConfigured ? "✓ Set" : "✗ Invalid / Missing"}`);
console.log("Method: HTTP API");
console.log(`From Email: ${isSenderConfigured ? fromEmail : "✗ Invalid / Missing"}`);
console.log("=========================================\n");

let apiInstance = null;

if (isBrevoKeyConfigured && isSenderConfigured) {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = brevoApiKey;
    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    console.log("✓ Brevo API client initialized successfully");
  } catch (initError) {
    console.error("✗ Failed to initialize Brevo API client:", initError.message);
  }
}

const sendMail = async (mailOptions) => {
  if (!isBrevoKeyConfigured) {
    const error = new Error("Brevo API key is not configured correctly");
    error.code = "BREVO_CONFIG_INVALID";
    throw error;
  }

  if (!isSenderConfigured) {
    const error = new Error("Brevo sender email is not configured correctly");
    error.code = "BREVO_SENDER_INVALID";
    throw error;
  }

  if (!apiInstance) {
    const error = new Error("Brevo API client is not initialized");
    error.code = "BREVO_INIT_FAILED";
    throw error;
  }

  if (!mailOptions.to) {
    throw new Error("Recipient email (to) is required");
  }

  if (!mailOptions.subject) {
    throw new Error("Email subject is required");
  }

  if (!mailOptions.html) {
    throw new Error("Email HTML content is required");
  }

  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = mailOptions.subject;
    sendSmtpEmail.htmlContent = mailOptions.html;
    sendSmtpEmail.sender = {
      name: "TakeCare App",
      email: mailOptions.from || fromEmail,
    };
    sendSmtpEmail.to = [{ email: mailOptions.to }];

    if (mailOptions.replyTo) {
      sendSmtpEmail.replyTo = { email: mailOptions.replyTo };
    }

    console.log("\n📧 Sending email via Brevo API...");
    console.log("To:", mailOptions.to);
    console.log("From:", sendSmtpEmail.sender.email);
    console.log("Subject:", mailOptions.subject);

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✓ Email sent successfully via Brevo API");
    console.log("Message ID:", result.messageId);
    return result;
  } catch (error) {
    console.error("\n✗ Failed to send email via Brevo API");
    console.error("Error Message:", error.message);
    console.error("Error Status:", error.status);

    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Body:", JSON.stringify(error.response.body, null, 2));
    }

    if (error.body) {
      console.error("Brevo Error Body:", JSON.stringify(error.body, null, 2));
    }

    if (error.message && error.message.includes("sender")) {
      const customError = new Error("sender email is not verified in Brevo. Visit https://app.brevo.com/settings/senders to verify your email.");
      customError.code = "BREVO_SENDER_INVALID";
      throw customError;
    }

    throw error;
  }
};

module.exports = {
  sendMail,
};
