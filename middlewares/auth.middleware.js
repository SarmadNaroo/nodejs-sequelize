import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies?.accessToken || req.header('Authorization');

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // Strip the "Bearer " prefix
  }

  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request. No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    // Find the user based on the decoded token's id
    const user = await User.findByPk(decodedToken.id, {
      attributes: { exclude: ['password'] }, // Exclude password for security
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid access token. User not found' });
    }

    req.user = user; // Attach the user to the request
    next();

  } catch (error) {
    console.log('Token verification error:', error.message);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
