import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Guardrail A: Verifies the client is logged in with a valid cryptographic token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the requesting identity context record and omit its hash password signature
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Authorization verification failed, token corrupted." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No authentication token payload identified." });
  }
};

// Guardrail B: Verifies user role clearance match parameters
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Action requires administrative clearance level." });
  }
};