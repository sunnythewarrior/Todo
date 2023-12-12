const jwt = require("jsonwebtoken");

// Secret key for signing the token
const secretKey = process.env.SECRET_TOKEN_KEY;

// Middleware to generate a token
const generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "10m" });
};

// Middleware to verify a token
const verifyToken = (req, res, next) => {
  // Retrieve the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    // If the token is valid, set the decoded information in the request for future use
    req.decoded = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
