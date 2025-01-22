const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  // console.log(req.headers);
  
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the "Authorization" header
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user data (including userId) to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
