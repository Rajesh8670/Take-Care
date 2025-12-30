const { Resend } = require("resend");
require("dotenv").config();

// Check if API key exists
if (!process.env.RESEND_API_KEY) {
    console.error("❌ CRITICAL ERROR: RESEND_API_KEY is not set!");
    console.error("Make sure RESEND_API_KEY environment variable is configured.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a transporter-like object for backward compatibility
const transporter = {
    sendMail: async (mailOptions) => {
        try {
            // Validate API key before sending
            if (!process.env.RESEND_API_KEY) {
                throw new Error("RESEND_API_KEY environment variable is not set");
            }

            const result = await resend.emails.send({
                from: mailOptions.from || "noreply@resend.dev",
                to: mailOptions.to,
                subject: mailOptions.subject,
                html: mailOptions.html
            });
            
            if (result.error) {
                throw new Error(result.error.message);
            }
            
            console.log("✅ Email sent successfully via Resend:", result.data.id);
            return result;
        } catch (error) {
            console.error("❌ Resend email error:", error.message);
            throw error;
        }
    }
};

console.log("✅ Email service initialized with Resend");
if (process.env.RESEND_API_KEY) {
    console.log("✅ RESEND_API_KEY is configured");
}

module.exports = transporter;
