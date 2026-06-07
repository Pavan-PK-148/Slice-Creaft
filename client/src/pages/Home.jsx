
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Clock,
  Award,
  Hammer,
} from "lucide-react";

import home from "../assets/home.jpg";
import step1 from "../assets/1.jpg";
import step2 from "../assets/2.jpg";
import step3 from "../assets/3.jpg";
import step4 from "../assets/4.jpg";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const workshopSteps = [
    {
      num: "01",
      name: "Crust Selection",
      desc: "Gluten-Free, Pan, or liquid Cheese Burst bases.",
      img: step1,
    },
    {
      num: "02",
      name: "Sauce Matrix",
      desc: "Classic Tangy Marinara to Fiery Schezwan fusion.",
      img: step2,
    },
    {
      num: "03",
      name: "Cheese Layering",
      desc: "Gouda blends or pure sharp premium Cheddar strings.",
      img: step3,
    },
    {
      num: "04",
      name: "Topping Assembly",
      desc: "Stack endless garden veggies and herbed proteins.",
      img: step4,
    },
  ];

  const stats = [
    {
      value: "50k+",
      label: "Orders Served",
      icon: Flame,
    },
    {
      value: "5 Min",
      label: "Fast Delivery",
      icon: Clock,
    },
    {
      value: "100%",
      label: "Fresh Ingredients",
      icon: Award,
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Ingredient Control",
      description:
        "Build your pizza exactly the way you want with unlimited customization.",
    },
    {
      icon: Zap,
      title: "Live Pizza Preview",
      description:
        "Experience real-time visual updates while building your pizza.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description:
        "Fast and protected payment system with seamless checkout flow.",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#fff8f3] relative">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-7"
        >

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            Ultimate Pizza Experience
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-black leading-tight text-gray-900"
          >
            Build Your
            <span className="block text-orange-500">
              Dream Pizza
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed max-w-xl"
          >
            Customize every layer of your pizza with premium crusts,
            rich sauces, gourmet cheeses, and delicious toppings.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-5 flex-wrap"
          >
            <Link
              to="/products"
              className="group relative overflow-hidden px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative"
          >

            {/* Glow */}
            <div className="absolute inset-0 bg-orange-400/30 blur-3xl rounded-full scale-110" />

            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[35px] p-5 shadow-2xl overflow-hidden group">

              <div className="absolute top-5 right-5 bg-red-500 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg">
                HOT PIZZA
              </div>

              <div className="overflow-hidden rounded-3xl">
                <img
                  src={home}
                  alt="Pizza"
                  className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-gray-900">
                    Supreme Pizza
                  </h2>

                  <span className="text-2xl font-black text-orange-500">
                    ₹410
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                  Loaded with premium toppings, creamy cheese,
                  and fresh vegetables baked to perfection.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-black text-white py-14 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md hover:border-orange-400 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="text-orange-400 w-8 h-8" />
                </div>

                <h3 className="text-4xl font-black">{item.value}</h3>

                <p className="text-gray-400 mt-2">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-semibold text-sm mb-5">
            <Hammer className="w-4 h-4" />
            Pizza Creation Process
          </div>

          <h2 className="text-5xl font-black text-gray-900 mb-4">
            4-Step Pizza Engineering
          </h2>

          <p className="text-gray-500 text-lg">
            Every step is optimized to create the perfect pizza experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {workshopSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -12,
              }}
              className="group relative bg-white rounded-[30px] overflow-hidden shadow-xl border border-orange-100"
            >

              {/* Glow Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative overflow-hidden h-56">
                <img
                  src={step.img}
                  alt={step.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <span className="absolute bottom-4 left-4 text-white text-5xl font-black">
                  {step.num}
                </span>
              </div>

              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {step.name}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-24 relative z-10">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-5">
              Why Choose SliceCraft?
            </h2>

            <p className="text-gray-500 text-lg">
              Advanced customization meets premium pizza craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="group bg-[#fff8f3] border border-orange-100 rounded-[30px] p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                >

                  <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
