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
        .header img {
          max-width: 120px;
          height: auto;
          margin-bottom: 10px;
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
        .otp-code {
          font-size: 42px;
          font-weight: 600;
          color: #fc5c7d;
          letter-spacing: 8px;
          margin: 30px 0;
          padding: 15px 20px;
          border: 2px dashed #fc5c7d;
          display: inline-block;
          border-radius: 8px;
          background-color: #fff4f6;
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
          <img src="https://i.ibb.co/p1Yp5hT/app-logo1.png" alt="Take Care Logo">
          <h1>Take Care</h1>
        </div>
        <div class="content">
          <h2>Your Verification Code</h2>
          <p>Hi there! Please use the following One-Time Password (OTP) to complete your verification process. </p>
          <div class="otp-code">${otp}</div>
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