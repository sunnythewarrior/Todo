const jwt = require("jsonwebtoken");

// Secret key for signing the token
const secretKey = process.env.SECRET_TOKEN_KEY;

// Middleware to generate a token
const generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "60m" });
};

// Middleware to verify a token
const verifyToken = (token, req, res) => {
  const secretKey = process.env.SECRET_TOKEN_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // If the token is valid, set the decoded information in the request for future use
    req.decoded = decoded;
    res
      .status(200)
      .json({ success: true, message: "Token verified successfully" });
  });
};

module.exports = { generateToken, verifyToken };
