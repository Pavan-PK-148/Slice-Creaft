import React, { useState, useEffect } from "react";

import AdminLayout from "../../components/AdminLayout";

import {
  Check,
  ClipboardList,
  ChefHat,
  Bike,
  CheckCircle2,
  Loader2,
  Activity,
  PackageCheck,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { apiRequest } from "../../utils/api";

import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchLiveQueue = async () => {
    try {
      const data = await apiRequest("/orders", {
        method: "GET",
      });

      setOrders(data);
    } catch (err) {
      toast.error("Failed to fetch live orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveQueue();
  }, []);

  const advanceStatus = async (id, currentLevel) => {
    if (currentLevel >= 4) return;

    const nextLevel = currentLevel + 1;

    const loadId = toast.loading("Updating order status...");

    try {
      await apiRequest(`/orders/${id}/status`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          level: nextLevel,
        }),
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                statusLevel: nextLevel,
              }
            : order
        )
      );

      toast.success("Order status updated 🎉", {
        id: loadId,
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to update order.", {
        id: loadId,
      });
    }
  };

  const getLevelLabel = (lvl) => {
    if (lvl === 1) return "Order Received";

    if (lvl === 2) return "Baking Pizza";

    if (lvl === 3) return "Out For Delivery";

    return "Delivered";
  };

  // LOADER
  if (loading) {
    return (
      <AdminLayout
        title="Live Production Queue"
        subtitle="Synchronizing operational pipelines..."
      >

        <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">

          {/* GLOW */}
          <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full border-4 border-orange-200 border-t-orange-500"
          />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Live Production Queue"
      subtitle="Manage active pizza production and delivery pipelines."
    >

      <div className="relative overflow-hidden">

        {/* GLOWS */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">

            <div>

              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Order Pipeline
              </h1>

              <p className="text-gray-500 text-lg">
                Track and manage all live pizza orders
              </p>
            </div>

            {/* LIVE STATUS */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[28px] px-6 py-5 shadow-xl flex items-center gap-4"
            >

              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <Activity className="w-7 h-7" />
              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Active Orders
                </p>

                <h3 className="text-3xl font-black text-gray-900">
                  {orders.length}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* ORDERS */}
          <div className="space-y-6">

            <AnimatePresence>

              {orders.map((order, idx) => {
                const currentLevel = order.statusLevel || 1;

                return (
                  <motion.div
                    key={order._id || idx}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      delay: idx * 0.05,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="group bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[35px] p-7 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >

                    {/* HOVER EFFECT */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-50 to-red-50" />

                    <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">

                      {/* LEFT */}
                      <div className="flex-1 space-y-5">

                        {/* ORDER HEADER */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                          <div className="px-4 py-2 rounded-full bg-orange-500 text-white font-bold shadow-md w-fit">
                            #{order._id?.slice(-6)}
                          </div>

                          <div>

                            <p className="text-lg font-black text-gray-900">
                              {order.shippingDetails?.fullName ||
                                "Guest User"}
                            </p>

                            <p className="text-gray-500 text-sm">
                              {order.items
                                ?.map((i) => i.name)
                                .join(" + ") ||
                                "Custom Pizza"}
                            </p>
                          </div>
                        </div>

                        {/* PIPELINE */}
                        <div className="space-y-3">

                          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Production Pipeline
                          </p>

                          <div className="flex flex-wrap gap-5">

                            <PipelineStep
                              active={currentLevel >= 1}
                              icon={<ClipboardList className="w-4 h-4" />}
                              label="Prep"
                              color="bg-orange-500"
                            />

                            <PipelineStep
                              active={currentLevel >= 2}
                              icon={<ChefHat className="w-4 h-4" />}
                              label="Bake"
                              color="bg-red-500"
                            />

                            <PipelineStep
                              active={currentLevel >= 3}
                              icon={<Bike className="w-4 h-4" />}
                              label="Transit"
                              color="bg-amber-500"
                            />

                            <PipelineStep
                              active={currentLevel >= 4}
                              icon={<CheckCircle2 className="w-4 h-4" />}
                              label="Delivered"
                              color="bg-green-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-row xl:flex-col items-center justify-between xl:items-end gap-5">

                        {/* PRICE */}
                        <div className="text-left xl:text-right">

                          <p className="text-sm text-gray-500 font-medium mb-1">
                            Order Total
                          </p>

                          <h2 className="text-4xl font-black text-gray-900">
                            ₹
                            {order.financials?.grossTotal ||
                              order.total ||
                              0}
                          </h2>

                          <div className="mt-2 inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                            {getLevelLabel(currentLevel)}
                          </div>
                        </div>

                        {/* BUTTON */}
                        {currentLevel < 4 && (
                          <motion.button
                            whileHover={{
                              scale: 1.03,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              advanceStatus(
                                order._id,
                                currentLevel
                              )
                            }
                            className="group relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-bold shadow-xl transition-all cursor-pointer"
                          >

                            <span className="relative z-10 flex items-center gap-3">
                              Next Step

                              <Check className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </span>

                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.button>
                        )}

                        {/* COMPLETED */}
                        {currentLevel >= 4 && (
                          <div className="flex items-center gap-3 bg-green-100 text-green-600 px-5 py-3 rounded-2xl font-bold shadow-md">

                            <PackageCheck className="w-5 h-5" />

                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* EMPTY */}
            {orders.length === 0 && (
              <div className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[35px] p-16 text-center shadow-xl">

                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  No Active Orders
                </h2>

                <p className="text-gray-500 text-lg">
                  Live orders will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* PIPELINE STEP */
function PipelineStep({
  active,
  icon,
  label,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
        active
          ? `${color} text-white border-transparent shadow-lg`
          : "bg-gray-100 text-gray-400 border-gray-200"
      }`}
    >

      {icon}

      <span className="font-bold text-sm">
        {label}
      </span>
    </motion.div>
  );
}
