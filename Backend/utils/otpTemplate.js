const otpTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP for Take Care</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', Arial, sans-serif;
          background-color: #f0f4f8;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          border: 1px solid #e0e0e0;
        }
        .header {
          background: linear-gradient(135deg, #6a82fb, #fc5c7d);
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .content h2 {
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        .otp-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }
        .otp-input {
          width: 200px;
          padding: 15px 20px;
          font-size: 32px;
          font-weight: 600;
          color: #fc5c7d;
          letter-spacing: 8px;
          border: 2px dashed #fc5c7d;
          border-radius: 8px;
          background-color: #fff4f6;
          text-align: center;
          -webkit-user-select: all; /* Chrome, Safari, Opera */
          -moz-user-select: all; /* Firefox */
          -ms-user-select: all; /* Internet Explorer/Edge */
          user-select: all; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
        }
        .copy-button {
          display: block;
          width: 150px;
          margin: 20px auto 0;
          padding: 12px 20px;
          background-color: #6a82fb;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .footer {
          background-color: #f0f4f8;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #888;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer a {
          color: #6a82fb;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Take Care</h1>
        </div>
        <div class="content">
          <h2>Your Verification Code</h2>
          <p>Hi there! Please use the following One-Time Password (OTP) to complete your verification process. </p>
          <p style="margin-bottom: 10px;">Click the code to select it, then copy.</p>
          <div class="otp-container">
            <div class="otp-input" tabindex="0">${otp}</div>
          </div>
          <p>This code is valid for 5 minutes. For your security, please do not share it with anyone.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Take Care. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = otpTemplate;
