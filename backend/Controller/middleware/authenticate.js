const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '6af03552ef42f5de7271ac3d968a7dae51cb49cb214b28cd62ad0e0ee6e6c1956dcfc695d52cc8e50941390e2b07675f6acdcfb09fe99ec6ec36b2287512a3c8'; // Retrieve the secret key from environment variables or hardcode it

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
