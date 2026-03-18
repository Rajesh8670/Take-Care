const otpTemplate = require("../utils/otpTemplate");
const { sendMail } = require("../utils/mail");
const NewAccount = require("../model/createAccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Simple in-memory storage for OTPs (use Redis/DB in production)
const otpStore = {};
const verifiedOtpStore = {};

const OTP_EXPIRY_MS = 5 * 60 * 1000;

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const markOtpVerified = (email) => {
  verifiedOtpStore[email] = {
    verifiedAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
  };
};

const hasVerifiedOtp = (email) => {
  const verifiedOtp = verifiedOtpStore[email];

  if (!verifiedOtp) {
    return false;
  }

  if (Date.now() > verifiedOtp.expiresAt) {
    delete verifiedOtpStore[email];
    return false;
  }

  return true;
};

const getOtp = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, page } = req.body;
    const normalizedEmail = normalizeEmail(email);

    // Validate email
    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email already exists
    const exists = await NewAccount.findOne({ email: normalizedEmail });
    if (exists && page === "signUp") {
      return res.status(409).json({ message: "Email already registered" });
    }

    if (!exists && page === "resetPassword") {
      return res.status(409).json({ message: "Email is not registered !! \nplease sign up first" });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("Generated OTP:", otp, "for email:", normalizedEmail);

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: normalizedEmail,
      subject: "Your TakeCare OTP",
      html: otpTemplate(otp),
    };

    try {
      console.log("📧 Sending OTP email via Brevo API...");
      await sendMail(mailOptions);

      otpStore[normalizedEmail] = {
        otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + OTP_EXPIRY_MS,
      };
      delete verifiedOtpStore[normalizedEmail];

      console.log("✅ OTP email sent successfully to:", normalizedEmail);

      res.status(201).json({
        message: "OTP sent successfully",
        email: normalizedEmail,
      });
    } catch (emailError) {
      console.error("❌ Failed to send OTP email:", emailError.message);
      console.error("Error Code:", emailError.code);

      res.status(500).json({
        message: "OTP email delivery failed. Please try again later.",
        debug: emailError.message,
        email: normalizedEmail,
      });
    }
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

const checkOtp = (req, res) => {
  try {
    const { userOtp, email } = req.body;
    const normalizedEmail = normalizeEmail(email);
    console.log("Check OTP request:", { userOtp, email: normalizedEmail });

    // Validate inputs
    if (!userOtp || !normalizedEmail) {
      return res.status(400).json({
        message: "userOtp and email are required",
        isVerified: false,
      });
    }

    // Check if OTP exists for this email
    if (!otpStore[normalizedEmail]) {
      return res.status(404).json({
        message: "OTP expired or not found. Please request a new OTP.",
        isVerified: false,
      });
    }

    const storedOtp = otpStore[normalizedEmail];

    // Check if OTP expired
    if (Date.now() > storedOtp.expiresAt) {
      delete otpStore[normalizedEmail];
      return res.status(410).json({
        message: "OTP expired. Please request a new OTP.",
        isVerified: false,
      });
    }

    // Verify OTP
    if (parseInt(userOtp) === storedOtp.otp) {
      console.log("OTP verified successfully for:", normalizedEmail);
      delete otpStore[normalizedEmail];
      markOtpVerified(normalizedEmail);

      res.json({
        message: "OTP verified successfully",
        isVerified: true,
        email: normalizedEmail,
        session: { isVerified: true },
      });
    } else {
      console.log("Invalid OTP attempt for:", normalizedEmail);
      res.status(401).json({
        message: "Invalid OTP",
        isVerified: false,
      });
    }
  } catch (error) {
    console.error("OTP Check Error:", error);
    res.status(500).json({
      message: "Error verifying OTP",
      error: error.message,
      isVerified: false,
    });
  }
};


const createAccount = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    // Validate
    if (!fullname || !normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!hasVerifiedOtp(normalizedEmail)) {
      return res.status(403).json({ message: "Please verify OTP before creating your account" });
    }

    // Check existing user
    const exists = await NewAccount.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const newUser = new NewAccount({
      fullname,
      email: normalizedEmail,
      password: hashedPassword,
      isLogin:false,
    });

    await newUser.save();
    delete verifiedOtpStore[normalizedEmail];

    res.status(201).json({ message: "Account created successfully" });

  } catch (error) {
    console.error("Create Account Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required",isLogin:false });
    }

    // Check user exists
    const user = await NewAccount.findOne({ email });
    console.log("inside user ",user);
    if (!user) {
      return res.status(404).json({ message: "User not found",isLogin:false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password",isLogin:false });
    }

  user.isLogin=true;
  await user.save();

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullname: user.fullname,
        email: user.email
      },
         session:{isLogin:user.isLogin}
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword=async(req,res)=>{
const {email,password}=req.body;
const normalizedEmail = normalizeEmail(email);
  try{
  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!hasVerifiedOtp(normalizedEmail)) {
    return res.status(403).json({ message: "Please verify OTP before resetting your password" });
  }

  const user=await NewAccount.findOne({email: normalizedEmail});
  if (!user){
    return  res.status(404).json({message:"User not found"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  user.password=hashedPassword;
  await user.save();
  delete verifiedOtpStore[normalizedEmail];
  return res.status(201).json({message:"Password Reset Success fully"});
    }catch(error){
      console.log("error in account create ",error);
    return  res.status(500).json({message:"Error During setpassord in DB"});
    }
    
  }




module.exports = { getOtp, checkOtp,createAccount,login,resetPassword};
