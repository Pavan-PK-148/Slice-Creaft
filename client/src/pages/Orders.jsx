import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  ChefHat,
  ClipboardList,
  Bike,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Pizza,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { apiRequest } from "../utils/api";

export default function Orders() {
  const location = useLocation();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const queryParams =
    new URLSearchParams(
      location.search
    );

  const orderId =
    queryParams.get("id");

  useEffect(() => {
    if (!orderId) {
      setLoading(false);

      setError(
        "No order ID found."
      );

      return;
    }

    const fetchLiveStatus =
      async () => {
        try {
          const data =
            await apiRequest(
              `/orders/${orderId}`
            );

          setOrder(data);

          setError(null);
        } catch (err) {
          console.error(
            "Tracking failed:",
            err
          );

          setError(
            err.message ||
              "Unable to track order."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchLiveStatus();

    const livePollingEngine =
      setInterval(
        fetchLiveStatus,
        15000
      );

    return () =>
      clearInterval(
        livePollingEngine
      );
  }, [orderId]);

  // LOADING
  if (loading) {
    return (
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">

        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

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
          className="relative z-10 w-24 h-24 rounded-full border-4 border-orange-200 border-t-orange-500"
        />
      </div>
    );
  }

  // ERROR
  if (error || !order) {
    return (
      <div className="relative overflow-hidden min-h-screen py-20">

        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

        <div className="relative z-10 max-w-xl mx-auto px-4 text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/70 backdrop-blur-2xl border border-red-100 rounded-[40px] p-12 shadow-2xl"
          >

            <div className="w-28 h-28 rounded-[30px] bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shadow-2xl mx-auto mb-8">

              <AlertCircle className="w-14 h-14" />
            </div>

            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Tracking Failed
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed">
              {error ||
                "Unable to locate this order."}
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-3 mt-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all"
            >

              <Pizza className="w-5 h-5" />

              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentOrderStatus =
    order.statusLevel || 1;

  const trackingSteps = [
    {
      level: 1,
      title: "Order Received",
      desc: "Your order has been verified successfully.",
      icon: ClipboardList,
    },

    {
      level: 2,
      title: "In The Kitchen",
      desc: "Chefs are preparing your pizza fresh.",
      icon: ChefHat,
    },

    {
      level: 3,
      title: "Out For Delivery",
      desc: "Courier partner is delivering your order.",
      icon: Bike,
    },

    {
      level: 4,
      title: "Delivered",
      desc: "Your pizza has arrived successfully.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-14">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

      {/* GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center mb-14"
        >

          {/* REF */}
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-orange-100 rounded-full px-5 py-3 shadow-lg mb-6">

            <ShieldCheck className="w-5 h-5 text-green-500" />

            <span className="text-sm font-bold text-gray-700">
              ORDER #{order._id?.slice(-8)}
            </span>
          </div>

          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Live Order Tracking
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Track your pizza in real-time from kitchen to doorstep.
          </p>
        </motion.div>

        {/* MAIN TRACKING CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-8 sm:p-10 shadow-2xl overflow-hidden"
        >

          {/* BACKGROUND GLOW */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/10 rounded-full blur-3xl" />

          {/* TIMELINE */}
          <div className="relative">

            {/* CONNECTOR LINE */}
            <div className="absolute left-[31px] top-8 bottom-8 w-1 bg-orange-100 rounded-full hidden sm:block overflow-hidden">

              <motion.div
                initial={{
                  height: 0,
                }}
                animate={{
                  height: `${
                    ((currentOrderStatus -
                      1) /
                      3) *
                    100
                  }%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="bg-gradient-to-b from-orange-500 to-red-500 w-full rounded-full"
              />
            </div>

            {/* STEPS */}
            <div className="space-y-10">

              {trackingSteps.map(
                (step, idx) => {
                  const StepIcon =
                    step.icon;

                  const isDone =
                    currentOrderStatus >=
                    step.level;

                  const isCurrent =
                    currentOrderStatus ===
                    step.level;

                  return (
                    <motion.div
                      key={step.level}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          idx * 0.12,
                      }}
                      className="relative flex flex-col sm:flex-row gap-5 sm:items-center"
                    >

                      {/* ICON */}
                      <motion.div
                        whileHover={{
                          scale: 1.08,
                        }}
                        className={`relative w-16 h-16 rounded-[22px] flex items-center justify-center shadow-xl shrink-0 transition-all duration-500 ${
                          isDone
                            ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                            : "bg-white border border-orange-100 text-gray-300"
                        }`}
                      >

                        {/* ACTIVE PULSE */}
                        {isCurrent && (
                          <motion.div
                            animate={{
                              scale: [
                                1,
                                1.4,
                              ],

                              opacity: [
                                0.6,
                                0,
                              ],
                            }}
                            transition={{
                              repeat:
                                Infinity,
                              duration: 1.8,
                            }}
                            className="absolute inset-0 rounded-[22px] bg-orange-400"
                          />
                        )}

                        <StepIcon className="relative z-10 w-7 h-7" />
                      </motion.div>

                      {/* TEXT */}
                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3 mb-2">

                          <h3
                            className={`text-2xl font-black ${
                              isDone
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >

                            {
                              step.title
                            }
                          </h3>

                          {isCurrent && (
                            <motion.div
                              initial={{
                                scale: 0,
                              }}
                              animate={{
                                scale: 1,
                              }}
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-2"
                            >

                              <Clock3 className="w-3 h-3" />

                              ACTIVE
                            </motion.div>
                          )}
                        </div>

                        <p
                          className={`text-lg leading-relaxed ${
                            isDone
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >

                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>

        {/* FOOTER STATUS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          whileHover={{
            y: -4,
          }}
          className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-[35px] p-7 text-white shadow-2xl"
        >

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div>

              <h3 className="text-3xl font-black mb-2">
                {
                  trackingSteps[
                    currentOrderStatus -
                      1
                  ]?.title
                }
              </h3>

              <p className="text-orange-100 text-lg">
                {
                  trackingSteps[
                    currentOrderStatus -
                      1
                  ]?.desc
                }
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4">

              <p className="text-orange-100 text-sm font-medium mb-1">
                Estimated Delivery
              </p>

              <h3 className="text-3xl font-black">
                15-20 Min
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
