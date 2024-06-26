const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  
  const token = req.headers['authorization'];

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    
    req.user = decoded;
    next(); 
  });
}

module.exports = verifyToken;
