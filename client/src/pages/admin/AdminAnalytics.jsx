import React from "react";

import AdminLayout from "../../components/AdminLayout";

import {
  PieChart,
  Activity,
  TrendingUp,
  BarChart3,
  TimerReset,
  Flame,
  Bike,
} from "lucide-react";

import { motion } from "framer-motion";

export default function AdminAnalytics() {
  const popularIngredients = [
    {
      name: "Liquid Cheese Burst Crust",
      rate: "74%",
      count: "1,114 choices",
      color: "from-red-500 to-orange-500",
      width: "74%",
    },
    {
      name: "Fiery Pepperoni Matrix",
      rate: "61%",
      count: "912 choices",
      color: "from-amber-500 to-orange-500",
      width: "61%",
    },
    {
      name: "Garlic Mushroom Blend",
      rate: "48%",
      count: "720 choices",
      color: "from-emerald-500 to-green-500",
      width: "48%",
    },
    {
      name: "Vegan Cheese Layer",
      rate: "22%",
      count: "330 choices",
      color: "from-blue-500 to-cyan-500",
      width: "22%",
    },
  ];

  const throughputData = [
    {
      label: "Assembly Prep Time",
      time: "3.4 Minutes",
      icon: <TimerReset className="w-5 h-5" />,
      color: "bg-orange-500",
    },
    {
      label: "Oven Processing Time",
      time: "5.2 Minutes",
      icon: <Flame className="w-5 h-5" />,
      color: "bg-red-500",
    },
    {
      label: "Delivery Dispatch Lag",
      time: "11.8 Minutes",
      icon: <Bike className="w-5 h-5" />,
      color: "bg-amber-500",
    },
  ];

  return (
    <AdminLayout
      title="System Performance Analytics"
      subtitle="Monitor ingredient usage, production telemetry, and operational metrics."
    >

      <div className="relative overflow-hidden">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">

            <div>

              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Analytics Dashboard
              </h1>

              <p className="text-gray-500 text-lg">
                Real-time ingredient and production insights
              </p>
            </div>

            {/* STATUS */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[28px] px-6 py-5 shadow-xl flex items-center gap-4"
            >

              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">

                <BarChart3 className="w-7 h-7" />
              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  System Efficiency
                </p>

                <h3 className="text-3xl font-black text-green-600">
                  94.2%
                </h3>
              </div>
            </motion.div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* INGREDIENT MATRIX */}
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
              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">

                  <PieChart className="w-8 h-8" />
                </div>

                <div>

                  <h2 className="text-3xl font-black text-gray-900">
                    Ingredient Matrix
                  </h2>

                  <p className="text-gray-500">
                    Most popular pizza ingredients
                  </p>
                </div>
              </div>

              {/* INGREDIENTS */}
              <div className="space-y-7">

                {popularIngredients.map((ing, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.08,
                    }}
                    whileHover={{
                      x: 5,
                    }}
                    className="space-y-3"
                  >

                    {/* LABELS */}
                    <div className="flex justify-between items-center gap-4">

                      <div>

                        <h3 className="text-lg font-black text-gray-900">
                          {ing.name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {ing.count}
                        </p>
                      </div>

                      <div className="text-2xl font-black text-orange-500">
                        {ing.rate}
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: ing.width,
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${ing.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TELEMETRY */}
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
                delay: 0.1,
              }}
              className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[40px] p-8 shadow-2xl flex flex-col justify-between"
            >

              <div>

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">

                    <Activity className="w-8 h-8" />
                  </div>

                  <div>

                    <h2 className="text-3xl font-black text-gray-900">
                      Throughput Logs
                    </h2>

                    <p className="text-gray-500">
                      Kitchen operational telemetry
                    </p>
                  </div>
                </div>

                {/* DATA CARDS */}
                <div className="space-y-5">

                  {throughputData.map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.08,
                        }}
                        whileHover={{
                          y: -4,
                        }}
                        className="bg-orange-50/70 border border-orange-100 rounded-[28px] p-5 flex items-center justify-between gap-5 shadow-md hover:shadow-xl transition-all duration-300"
                      >

                        <div className="flex items-center gap-4">

                          <div
                            className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-lg`}
                          >
                            {item.icon}
                          </div>

                          <div>

                            <h3 className="text-lg font-black text-gray-900">
                              {item.label}
                            </h3>

                            <p className="text-gray-500 text-sm">
                              Average operational timing
                            </p>
                          </div>
                        </div>

                        <div className="text-right">

                          <h2 className="text-2xl font-black text-gray-900">
                            {item.time}
                          </h2>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {/* FOOTER STATUS */}
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[30px] p-6 text-white shadow-2xl"
              >

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">

                    <TrendingUp className="w-8 h-8" />
                  </div>

                  <div>

                    <h2 className="text-2xl font-black mb-1">
                      Optimal Load Balance
                    </h2>

                    <p className="text-green-100 leading-relaxed">
                      Kitchen systems are processing below maximum capacity thresholds.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
