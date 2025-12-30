const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a transporter-like object for backward compatibility
const transporter = {
    sendMail: async (mailOptions) => {
        try {
            const result = await resend.emails.send({
                from: mailOptions.from || "TakeCare <onboarding@resend.dev>",
                to: mailOptions.to,
                subject: mailOptions.subject,
                html: mailOptions.html
            });
            
            if (result.error) {
                throw new Error(result.error.message);
            }
            
            console.log("Email sent successfully via Resend:", result.data.id);
            return result;
        } catch (error) {
            console.error("Resend email error:", error);
            throw error;
        }
    }
};

console.log("Email service initialized with Resend");

module.exports = transporter;
