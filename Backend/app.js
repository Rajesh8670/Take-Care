require('dotenv').config();

// core module
const path = require('path');

// External module
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

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
