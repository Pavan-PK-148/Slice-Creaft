// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Package, Receipt, ArrowRight, Eye, Loader2 } from 'lucide-react';
import { apiRequest } from '../utils/api';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountHistory = async () => {
      try {
        const data = await apiRequest('/orders/my-history');
        setOrders(data);
      } catch (err) {
        console.error("Failed to parse historical account backlogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountHistory();
  }, []);

  const formatOrderTimestamp = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-sans">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-xs text-gray-400 font-medium">Recompiling configuration manifest history...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-4 font-sans">
        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-gray-900">No account history found</h2>
        <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
          You haven't ordered any custom pizza configurations yet. Run through our builder workspace to log your first order.
        </p>
        <Link to="/products" className="inline-block mt-6 bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-red-100">
          Configure a Pizza Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-gray-900">Your Order History</h2>
        <p className="text-xs text-gray-400 mt-1">Review the architectural manifests of your past culinary configurations.</p>
      </div>

      {/* History Feed Loop */}
      <div className="space-y-4">
        {orders.map((order, idx) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden"
          >
            {/* Top Info Bar Header */}
            <div className="bg-gray-50/60 px-5 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center text-xs">
              <div className="flex gap-6 flex-wrap">
                <div>
                  <span className="text-gray-400 font-semibold uppercase tracking-wider block">Order Reference</span>
                  <span className="font-mono font-bold text-gray-900 text-xs mt-0.5 block truncate max-w-[140px] sm:max-w-none">
                    {order._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase tracking-wider block">Dispatched Date</span>
                  <span className="text-gray-700 font-medium flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {formatOrderTimestamp(order.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase tracking-wider block">Gross Total Bill</span>
                  <span className="text-gray-900 font-bold text-sm mt-0.5 block">₹{order.financials?.grossTotal}</span>
                </div>
              </div>

              <div>
                <span className={`font-bold px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase shadow-xs ${
                  order.statusLevel === 4 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {order.statusLevel === 4 ? "Delivered" : "Processing"}
                </span>
              </div>
            </div>

            {/* Inner Blueprint Specifics Breakdown */}
            <div className="p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="space-y-3 flex-1">
                <h4 className="font-heading text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-500" /> Itemized Blueprint Stack ({order.items?.length || 0})
                </h4>
                
                <div className="space-y-2">
                  {order.items?.map((item, itemIdx) => (
                    <div key={itemIdx} className="text-xs text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-3">
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-[11px]">
                        <strong>Base Layer:</strong> {item.details?.base} | <strong>Under-Sauce:</strong> {item.details?.sauce} | <strong>Cheese:</strong> {item.details?.cheese}
                      </p>
                      {((item.details?.veggies?.length > 0) || (item.details?.meats?.length > 0)) && (
                        <p className="text-gray-400 text-[10px] truncate max-w-xl">
                          <strong>Toppings:</strong> {[...(item.details?.veggies || []), ...(item.details?.meats || [])].join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Anchors */}
              <div className="flex gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 shrink-0">
                <Link
                  to={`/orders?id=${order._id}`}
                  className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Track Status</span>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors group"
                >
                  <span>Reorder Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}