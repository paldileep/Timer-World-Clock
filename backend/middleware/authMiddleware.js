const jwt = require('jsonwebtoken');
const User = require("../models/userModel"); 
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {

    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const token = req.headers.token && req.headers.token

    // If token is not provided
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Check if the user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;
    next();

  } catch (error) {
    if(error instanceof jwt.TokenExpiredError){
      return res.status(401).json({ message: 'Token Expired' })
    }

    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
