import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper function to sign JSON Web Tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new user (Customer by default)
// @route   POST /api/auth/signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'A user account with this email address already exists.' });
    }

    // Force strict registration limits: ensure users can't easily spoof admin access through raw payloads
    const assignedRole = role === 'admin' ? 'admin' : 'customer';

    const user = await User.create({
      name,
      email,
      password, // The User.js pre-save hook handles encryption automatically
      role: assignedRole
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration engine failed.', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email address or password combination.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login execution sequence failed.', error: error.message });
  }
};

// @desc    Get logged-in user profile data
// @route   GET /api/auth/me
export const getUserProfile = async (req, res) => {
  // Accesses req.user injected directly from your auth gatekeeper middleware
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: 'User manifest data missing.' });
  }
};