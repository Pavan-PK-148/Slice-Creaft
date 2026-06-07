// server/models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      name: { type: String, required: true },
      details: {
        base: { type: String, required: true },
        sauce: { type: String, required: true },
        cheese: { type: String, required: true },
        veggies: [{ type: String }],
        meats: [{ type: String }]
      },
      totalPrice: { type: Number, required: true }
    }
  ],
  shippingDetails: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  financials: {
    subtotal: { type: Number, required: true },
    taxAndPackaging: { type: Number, default: 45 },
    grossTotal: { type: Number, required: true }
  },
  payment: {
    gateway: { type: String, default: 'Razorpay Sandbox' },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Paid' }
  },
  statusLevel: {
    type: Number,
    enum: [1, 2, 3, 4], // 1: Received, 2: Kitchen, 3: Dispatched, 4: Served
    default: 1
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;