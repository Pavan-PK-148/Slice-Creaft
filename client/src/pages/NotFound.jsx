import React from "react";

import { Link } from "react-router-dom";

import {
  ShieldAlert,
  ArrowLeft,
  Pizza,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 py-12">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      {/* FLOATING ICON */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 hidden lg:block text-orange-200"
      >

        <Pizza className="w-24 h-24" />
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-10 sm:p-14 shadow-2xl text-center overflow-hidden"
      >

        {/* INNER GLOW */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/10 rounded-full blur-3xl" />

        {/* ERROR ICON */}
        <motion.div
          animate={{
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="relative mx-auto w-32 h-32 rounded-[35px] bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-[0_20px_50px_rgba(255,115,0,0.35)] mb-10"
        >

          <div className="absolute inset-0 rounded-[35px] bg-white/10" />

          <ShieldAlert className="relative z-10 w-16 h-16 text-white" />
        </motion.div>

        {/* ERROR CODE */}
        <div className="flex items-center justify-center gap-2 text-orange-500 font-black tracking-[0.25em] uppercase text-sm mb-4">

          <Sparkles className="w-4 h-4" />

          Error 404
        </div>

        {/* TITLE */}
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-5">
          Blueprint Missing
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          The page or configuration you are attempting to access
          either does not exist or requires additional administrative
          permissions to continue.
        </p>

        {/* BUTTON */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="mt-12"
        >

          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_15px_40px_rgba(255,115,0,0.35)] transition-all"
          >

            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />

            Return to Dashboard
          </Link>
        </motion.div>

        {/* FOOTER TEXT */}
        <p className="mt-8 text-sm text-gray-400 font-medium">
          SliceCraft HQ • Secure Routing Gateway
        </p>
      </motion.div>
    </div>
  );
}
