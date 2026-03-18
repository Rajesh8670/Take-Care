require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

console.log("\n=== Environment Variables Check ===");
const envValidators = {
  BREVO_API_KEY: (value) =>
    Boolean(value) &&
    value.startsWith("xkeysib-") &&
    !value.includes("${"),
  JWT_SECRET: (value) => Boolean(value) && !value.includes("${"),
  FROM_EMAIL: (value) =>
    Boolean(value) && value.includes("@") && !value.includes("${"),
};

let envCheckPassed = true;
Object.entries(envValidators).forEach(([envVar, validator]) => {
  if (validator((process.env[envVar] || "").trim())) {
    console.log(`${envVar}: Set`);
  } else {
    console.error(`${envVar}: MISSING OR INVALID - This is required!`);
    envCheckPassed = false;
  }
});

if (!envCheckPassed) {
  console.error(
    "\nWARNING: Some environment variables are missing or invalid. Email or auth features may fail."
  );
}
console.log("====================================\n");

const takeCareRoute = require("./Routes/authRouter");
const healthReportRoutes = require("./Routes/healthReportRoutes");
const aiRoutes = require("./Routes/aiRoutes");

const DB_path =
  "mongodb+srv://root:Rajesh9749@rajeshcoding.dzhwuty.mongodb.net/TakeCare?appName=RajeshCoding";

const app = express();
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "https://take-care-frontend.onrender.com,http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "otp_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/takeCare", takeCareRoute);
app.use("/api/takeCare", healthReportRoutes);
app.use("/api/ai", aiRoutes);

app.use(express.static(path.join(__dirname, "..", "Frontend", "dist")));

mongoose
  .connect(DB_path)
  .then(() => {
    console.log("Connected with mongoose");
    const port = process.env.PORT || 5000;

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server starts Successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting the DB", err);
  });
