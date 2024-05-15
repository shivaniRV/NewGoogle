const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get the JWT token from the Authorization header
  const token = req.headers['authorization'];

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token with the JWT secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // If the token is valid, attach the decoded payload to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware
  });
}

module.exports = verifyToken;
