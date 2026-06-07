// server/controllers/orderController.js
import Order from '../models/Order.js';

// @desc    Create a new pizza order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, shippingDetails, financials, paymentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cannot log empty checkout basket arrays." });
    }

    // Server-side total confirmation
    const calculatedSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAndPackaging = 45;
    const computedGross = calculatedSubtotal + taxAndPackaging;

    const newOrder = new Order({
      user: req.user.id, // Populated from your auth middleware
      items,
      shippingDetails,
      financials: {
        subtotal: calculatedSubtotal,
        taxAndPackaging,
        grossTotal: computedGross
      },
      payment: {
        transactionId: paymentId || `TXT-SANDBOX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: 'Paid'
      }
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to write transaction records.", error: error.message });
  }
};

// @desc    Get order history logs for the logged-in customer
// @route   GET /api/orders/my-history
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const historicalLogs = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(historicalLogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to pull historical ledger streams.", error: error.message });
  }
};

// @desc    Get status for a specific order reference
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const trackingManifest = await Order.findById(req.params.id);
    
    if (!trackingManifest) {
      return res.status(404).json({ message: "Order record reference index missing." });
    }

    // Guard preventing users from looking at someone else's receipt logs
    if (trackingManifest.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied to third-party receipt logs." });
    }

    res.status(200).json(trackingManifest);
  } catch (error) {
    res.status(500).json({ message: "Tracking lookup error context.", error: error.message });
  }
};

// @desc    Get all global orders (Admin Queue panel)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const globalQueue = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(globalQueue);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch master admin pipeline.", error: error.message });
  }
};

// @desc    Update live track status configuration level
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { statusLevel } = req.body;
    
    if (!statusLevel || statusLevel < 1 || statusLevel > 4) {
      return res.status(400).json({ message: "Invalid track context configuration integer index." });
    }

    const modifiedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { statusLevel },
      { new: true }
    );

    if (!modifiedOrder) {
      return res.status(404).json({ message: "Order entry reference signature missing." });
    }

    res.status(200).json(modifiedOrder);
  } catch (error) {
    res.status(500).json({ message: "Status state tracking update processing dropped.", error: error.message });
  }
};
