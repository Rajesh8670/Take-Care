const transporter = require("../utils/mail");
const NewAccount = require("../model/createAccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Simple in-memory storage for OTPs (use Redis/DB in production)
const otpStore = {};

const getOtp = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email,page } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

        // Check if email already exists
    const exists = await NewAccount.findOne({ email });
    if (exists && page==="signUp") {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (!exists && page==="resetPassword") {
      return res.status(409).json({ message: "Email is not registered !! \nplease sign up first" });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("Generated OTP:", otp, "for email:", email);
    
    // Store OTP with email (expires in 5 minutes)
    otpStore[email] = {
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000
    };
    
    const mailOptions = {
      from: "TakeCare <no-reply@TakeCare.com>",
      to: email,
      subject: "Your TakeCare OTP",
      html: `
        <h3>Hello !!</h3>
        <p>Your OTP is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>It expires in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
    
 res.status(201).json({
  message: "OTP sent successfully",
  email
});


  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

const checkOtp = (req, res) => {
  try {
    const { userOtp, email } = req.body;
    console.log("Check OTP request:", { userOtp, email });

    // Validate inputs
    if (!userOtp || !email) {
      return res.status(400).json({ 
        message: "userOtp and email are required",
        isVerified: false 
      });
    }

    // Check if OTP exists for this email
    if (!otpStore[email]) {
      return res.json({ 
        message: "OTP expired or not found. Please request a new OTP.",
        isVerified: false 
      });
    }

    const storedOtp = otpStore[email];

    // Check if OTP expired
    if (Date.now() > storedOtp.expiresAt) {
      delete otpStore[email];
      return res.json({ 
        message: "OTP expired. Please request a new OTP.",
        isVerified: false 
      });
    }

    // Verify OTP
    if (parseInt(userOtp) === storedOtp.otp) {
      console.log("OTP verified successfully for:", email);
      delete otpStore[email]; // Clear OTP after verification

    

      res.json({
        message: "OTP verified successfully",
        isVerified: true,
        email: email,
        session: { isVerified: true }
      });
    } else {
      console.log("Invalid OTP attempt for:", email);
      res.json({
        message: "Invalid OTP",
        isVerified: false
      });
    }
  } catch (error) {
    console.error("OTP Check Error:", error);
    res.status(500).json({ 
      message: "Error verifying OTP", 
      error: error.message,
      isVerified: false 
    });
  }
};


const createAccount = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const exists = await NewAccount.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const newUser = new NewAccount({
      fullname,
      email,
      password: hashedPassword,
      isLogin:false,
    });

    await newUser.save();

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
  try{
  const user=await NewAccount.findOne({email});
  if (!user){
    return  res.status(404).json({message:"User not found"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  user.password=hashedPassword;
  await user.save();
  return res.status(201).json({message:"Password Reset Success fully"});
    }catch(error){
      console.log("error in account create ",error);
    return  res.status(500).json({message:"Error During setpassord in DB"});
    }
    
  }




module.exports = { getOtp, checkOtp,createAccount,login,resetPassword};
