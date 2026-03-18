require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("\n=== SMTP Configuration Test ===\n");
console.log("Host:", process.env.SMTP_HOST);
console.log("Port:", process.env.SMTP_PORT);
console.log("Secure:", process.env.SMTP_SECURE);
console.log("Email:", process.env.SMTP_EMAIL);
console.log("Password length:", process.env.SMTP_PASSWORD?.length);
console.log("Password:", process.env.SMTP_PASSWORD);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

console.log("\n=== Verifying SMTP Connection ===\n");

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP Connection Failed:");
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Response:", error.response);
        if (error.responseCode) {
            console.error("Response Code:", error.responseCode);
        }
        process.exit(1);
    } else {
        console.log("✅ SMTP Connection Successful!");
        console.log("Server is ready to send emails\n");
        
        // Test sending an email
        console.log("=== Sending Test Email ===\n");
        
        const mailOptions = {
            from: `TakeCare App <${process.env.FROM_EMAIL}>`,
            to: "test@example.com",
            subject: "Test Email from TakeCare",
            html: "<h1>Test Email</h1><p>If you receive this, Brevo SMTP is working!</p>"
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Email sending failed:");
                console.error("Error:", error.message);
                process.exit(1);
            } else {
                console.log("✅ Email sent successfully!");
                console.log("Message ID:", info.messageId);
                process.exit(0);
            }
        });
    }
});
