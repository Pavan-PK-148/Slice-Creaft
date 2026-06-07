// server/routes/orderRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Order from '../models/Order.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
} from '../controllers/orderController.js';

const router = express.Router();

// Matches: POST /api/orders (Create) & GET /api/orders (Admin View All)
router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

// Matches: GET /api/orders/my-history
router.route('/my-history').get(protect, getMyOrders);

// Matches: GET /api/orders/:id
router.route('/:id').get(protect, getOrderById);

// Matches: PUT /api/orders/:id/status
router.route('/:id/status')
  .put(protect, admin, async (req, res) => {
    try {
      const { id } = req.params;
      const { level } = req.body;

      if (!level || level < 1 || level > 4) {
        return res.status(400).json({ message: "Invalid status level tier parameters." });
      }

      // Find the order document and increment its numerical status level
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { statusLevel: Number(level) } },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order profile node not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Database entry synchronized successfully.",
        order: updatedOrder
      });
    } catch (error) {
      console.error("Status sync error:", error);
      return res.status(500).json({ message: "Internal server update failure.", error: error.message });
    }
  });

// Matches: POST /api/orders/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All form variables are required." });
    }
    console.log(`[Support Inquiry Logged]: ${name} - ${subject}`);
    res.status(200).json({ success: true, message: "Inquiry logged to core system pipeline." });
  } catch (error) {
    res.status(500).json({ message: "Server connection failure archiving message." });
  }
});

export default router;