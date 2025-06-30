require("dotenv").config();
const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  if (!token) {
    console.log("Token not found in headers");
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    console.log("Token verified. User payload:", user);
    
    req.user = user; 
    next(); 
  });
};


const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: Unauthorized role" });
      }
      next();
    };
  };
  

module.exports = { 
    authenticateToken, 
    authorizeRoles, 
};
