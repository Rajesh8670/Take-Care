require('dotenv').config();

// core module
const path = require('path');

// External module
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

// Verify critical environment variables
console.log("\n=== Environment Variables Check ===");
const requiredEnvVars = ['SMTP_EMAIL', 'SMTP_PASSWORD', 'JWT_SECRET'];
let envCheckPassed = true;

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: Set`);
  } else {
    console.error(`❌ ${envVar}: NOT SET - This is required!`);
    envCheckPassed = false;
  }
});

if (!envCheckPassed) {
  console.error("\n⚠️  WARNING: Missing environment variables! The app may not work properly.");
  console.error("Make sure these are set in Render Dashboard > Settings > Environment Variables");
}
console.log("====================================\n");

// Local File
// const rootDir = require('./utils/pathUtil');
const takeCareRoute = require('./Routes/authRouter');
const healthReportRoutes = require('./Routes/healthReportRoutes');


const DB_path = "mongodb+srv://root:Rajesh9749@rajeshcoding.dzhwuty.mongodb.net/TakeCare?appName=RajeshCoding"

const app = express();
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  'https://take-care-frontend.onrender.com,http://localhost:5173,http://127.0.0.1:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'otp_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes MUST come before static files
app.use('/api/takeCare', takeCareRoute);
app.use('/api/takeCare', healthReportRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'dist')));

// SPA fallback - For all other GET requests, send back the frontend's index.html file.
// This must be LAST to handle React Router navigation


mongoose.connect(DB_path).then(() => {
  console.log("Connected with mongoose");
  const port = process.env.PORT || 5000;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server starts Successfully on port ${port}`);
  });

}).catch((err) => {
  console.log("Error while connecting the DB", err);
});
