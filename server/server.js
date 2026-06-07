import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import connectDB from './config/db.js';
import adminRouter from './routes/adminRoutes.js';
import authRouter from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Establish environment profiles and initialize database engine pools
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve absolute directories under local ES module parameters
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-verify systemic local uploads destination tracking node folders exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Global Cross-Origin & Core Parser Handlers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve absolute upload target maps statically across web protocols
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Core Modular Router Allocations
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter);
app.use('/api/orders', orderRoutes);

// Health Telemetry Testing Endpoint
app.use('/api/health', (req, res) => {
  res.status(200).json({ status: "ONLINE", timestamp: new Date() });
});

// Catch-all Multer and Pipeline Error Parser Interceptor
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || "An unexpected processing error occurred inside backend core systems."
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SliceCraft Core Engine actively broadcasting on PORT: ${PORT}`);
});