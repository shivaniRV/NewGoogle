const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Export the function
module.exports = { generateToken };

