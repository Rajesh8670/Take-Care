const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and has the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized. Token is missing or format is incorrect. Expected 'Bearer <token>'.",
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // Check if token is null, undefined, or literally the string 'null'
  if (!token || token === "null") {
    return res.status(401).json({ message: "Unauthorized. A valid token is required." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info (e.g., userId) to the request
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Unauthorized. Token has expired." });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized. Token is invalid." });
    }
    // Generic error for other cases
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
