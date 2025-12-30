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
const requiredEnvVars = ['RESEND_API_KEY', 'JWT_SECRET'];
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

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'otp_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(rootDir, 'public')));

app.use('/api/takeCare', takeCareRoute);
app.use('/api/takeCare', healthReportRoutes);


mongoose.connect(DB_path).then(() => {
  console.log("Connected with mongoose");

  app.listen(5000, '0.0.0.0', () => {
    console.log("Server starts Successfully on port 5000");
  });

}).catch((err) => {
  console.log("Error while connecting the DB", err);
});
