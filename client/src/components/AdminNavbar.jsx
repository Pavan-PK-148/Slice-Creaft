import React from "react";

import { Link } from "react-router-dom";

import {
  ShieldAlert,
  User,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 py-4">

      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm">

        <div className="h-18 px-6 sm:px-8 flex items-center justify-between">

          {/* LEFT LOGO */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3"
          >

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-sm"
            >

              <ShieldAlert className="w-5 h-5" />
            </motion.div>

            <div>

              <h2 className="text-xl font-black text-gray-900 leading-none">
                SliceCraft HQ
              </h2>

              <p className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* RIGHT ADMIN PROFILE */}
          <motion.div
            whileHover={{ y: -1 }}
            className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
          >

            {/* AVATAR */}
            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center">

                <User className="w-5 h-5" />
              </div>

              {/* ONLINE STATUS */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
            </div>

            {/* INFO */}
            <div className="hidden sm:block">

              <div className="flex items-center gap-1.5">

                <h3 className="text-sm font-bold text-gray-900">
                  Administrator
                </h3>

                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              </div>

              <p className="text-[11px] text-gray-500 font-medium">
                Root Access
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
