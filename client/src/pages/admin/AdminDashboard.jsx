import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

import {
  DollarSign,
  Truck,
  AlertCircle,
  ShoppingBag,
  Loader2,
  TrendingUp,
  Activity,
} from "lucide-react";

import { apiRequest } from "../../utils/api";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasterQueueData = async () => {
      try {
        const data = await apiRequest("/orders");

        setOrders(data);
      } catch (error) {
        console.error("Failed fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterQueueData();
  }, []);

  // LOADER
  if (loading) {
    return (
      <AdminLayout
        title="Operational Center"
        subtitle="Synchronizing telemetry parameters..."
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

  // METRICS
  const grossIntake = orders.reduce(
    (sum, ord) => sum + (ord.financials?.grossTotal || 0),
    0
  );

  const activePrepCount = orders.filter(
    (ord) => ord.statusLevel >= 1 && ord.statusLevel <= 3
  ).length;

  const kitchenCount = orders.filter(
    (ord) => ord.statusLevel === 2
  ).length;

  const transitCount = orders.filter(
    (ord) => ord.statusLevel === 3
  ).length;

  const completedVolume = orders.filter(
    (ord) => ord.statusLevel === 4
  ).length;

  const indicators = [
    {
      label: "Gross Revenue",
      total: `₹${grossIntake.toLocaleString()}`,
      context: "Total platform revenue",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50",
    },
    {
      label: "Active Orders",
      total: `${activePrepCount}`,
      context: `${kitchenCount} baking • ${transitCount} transit`,
      icon: Truck,
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
    },
    {
      label: "Total Orders",
      total: `${orders.length}`,
      context: "All submitted orders",
      icon: AlertCircle,
      color: "from-amber-500 to-yellow-500",
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      total: `${completedVolume}`,
      context: "Delivered successfully",
      icon: ShoppingBag,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout
      title="Operational Center"
      subtitle="Monitor system telemetry metrics and live order activity."
    >

      <div className="relative overflow-hidden">

        {/* BACKGROUND GLOWS */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">

          {/* TOP HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>

              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Dashboard Analytics
              </h1>

              <p className="text-gray-500 text-lg">
                Real-time operational insights and system metrics
              </p>
            </div>

            {/* STATUS CARD */}
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
                  System Status
                </p>

                <h3 className="text-2xl font-black text-green-600">
                  Operational
                </h3>
              </div>
            </motion.div>
          </div>

          {/* METRIC CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {indicators.map((stat, idx) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: idx * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[32px] p-7 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >

                  {/* HOVER GRADIENT */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-50 to-red-50" />

                  <div className="relative z-10 flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                        {stat.label}
                      </p>

                      <h2 className="text-4xl font-black text-gray-900 mb-2">
                        {stat.total}
                      </h2>

                      <p className="text-gray-500 text-sm">
                        {stat.context}
                      </p>
                    </div>

                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center shadow-lg shrink-0`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RECENT ORDERS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[40px] p-8 shadow-2xl"
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Recent Orders
                </h2>

                <p className="text-gray-500">
                  Latest pizza blueprint submissions
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>

            {/* ORDERS */}
            {recentOrders.length === 0 ? (
              <div className="text-center py-16">

                <p className="text-gray-500 text-lg">
                  No orders available
                </p>
              </div>
            ) : (
              <div className="space-y-5">

                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      x: 6,
                    }}
                    className="group bg-orange-50/70 border border-orange-100 rounded-[28px] p-6 hover:shadow-lg transition-all duration-300"
                  >

                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                      {/* LEFT */}
                      <div className="flex-1">

                        <h3 className="text-xl font-black text-gray-900 mb-2">
                          {order.items?.map((i) => i.name).join(", ") ||
                            "Custom Pizza"}
                        </h3>

                        <div className="space-y-1 text-sm text-gray-500">

                          <p>
                            <span className="font-bold text-orange-500">
                              Ref ID:
                            </span>{" "}
                            {order._id}
                          </p>

                          <p>
                            <span className="font-bold text-orange-500">
                              User:
                            </span>{" "}
                            {order.user?.name || "Guest"}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-row lg:flex-col items-center justify-between lg:items-end gap-3">

                        <h2 className="text-3xl font-black text-gray-900">
                          ₹{order.financials?.grossTotal}
                        </h2>

                        <div className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-bold shadow-md">
                          Level {order.statusLevel || 1}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
