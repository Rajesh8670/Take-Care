# Nodemailer Setup Guide for TakeCare

## Overview
The email system has been switched from Resend to Nodemailer for better flexibility and reliability.

## Setup Instructions

### Option 1: Using Gmail (Recommended for Development)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled

#### Step 2: Generate App Password
1. Go to [Google Account - App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy this password (you'll need it in the next step)

#### Step 3: Update .env File
Edit `TakeCare/Backend/.env` and update these fields:

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your_gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
FROM_EMAIL=your_gmail@gmail.com
```

Replace:
- `your_gmail@gmail.com` with your actual Gmail address
- `xxxx xxxx xxxx xxxx` with the 16-character app password from Step 2

### Option 2: Using Another Email Provider

Update the SMTP settings in `.env`:

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your_email@domain.com
SMTP_PASSWORD=your_app_password
```

## Testing the Setup

### Method 1: Test via API Request
1. Start the backend server: `npm run dev`
2. Send a POST request to `/api/send-otp` with:
```json
{
  "email": "test@gmail.com",
  "page": "signUp"
}
```

### Method 2: Check Console Logs
The backend will log:
- ✅ SMTP server is ready to send emails (if connection is successful)
- ✅ Email sent successfully (if email is sent)
- ❌ Error messages if something fails

## Troubleshooting

### Issue: "SMTP connection failed"
- **Solution**: Check your SMTP credentials in `.env` are correct
- Make sure 2FA is enabled and app password is generated (for Gmail)

### Issue: "Authentication failed"
- **Solution**: 
  - Verify SMTP_EMAIL and SMTP_PASSWORD are correct
  - For Gmail, ensure you're using the app password (not your main password)
  - Remove spaces from the app password if present

### Issue: "OTP generated but email delivery failed"
- **Solution**:
  - Check the backend console logs for the exact error
  - Verify the recipient email address is correct
  - Ensure your SMTP account allows sending to that email address

### Issue: Email not received after 5 minutes
- **Solution**:
  - Check spam/junk folder
  - Verify the email was sent (check backend logs)
  - Try with a different recipient email address
  - Check SMTP provider's sending limits/restrictions

## Security Best Practices

1. **Never commit .env file** - It contains sensitive credentials
2. **Use environment variables** in production
3. **Rotate app passwords** periodically
4. **Use strong SMTP passwords**
5. **Limit SMTP access** - Use app passwords instead of main password (Gmail)

## Useful Commands

```bash
# Start backend in development mode
npm run dev

# View logs
# Check the terminal where the backend is running

# Test email functionality
# Use the OTP request endpoint with a test email
```

## Additional Resources

- [Nodemailer Official Documentation](https://nodemailer.com/)
- [Gmail App Passwords Help](https://support.google.com/accounts/answer/185833)
- [SMTP Configuration Guides](https://nodemailer.com/smtp/)
