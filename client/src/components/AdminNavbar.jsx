import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ShieldAlert,
  User,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-hot-toast";

export default function AdminNavbar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("slicecraft_user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 py-4">

      <div className="max-w-7xl mx-auto bg-white border border-orange-100 rounded-3xl shadow-lg shadow-orange-100/40">

        <div className="h-[88px] px-6 sm:px-8 flex items-center justify-between">

          {/* LEFT LOGO */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-4"
          >

            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: 6,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg"
            >

              <ShieldAlert className="w-6 h-6" />
            </motion.div>

            <div>

              <h2 className="text-2xl font-black text-gray-900 leading-none">
                SliceCraft HQ
              </h2>

              <p className="text-[11px] text-orange-500 font-bold mt-2 uppercase tracking-[0.25em]">
                Admin Control Center
              </p>
            </div>
          </Link>

          {/* RIGHT ADMIN PROFILE */}
          <div className="relative">

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 border border-orange-100 rounded-2xl px-4 py-2.5 transition-all shadow-sm"
            >

              {/* AVATAR */}
              <div className="relative">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-md">

                  <User className="w-5 h-5" />
                </div>

                {/* ONLINE */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
              </div>

              {/* INFO */}
              <div className="hidden sm:block text-left">

                <div className="flex items-center gap-1.5">

                  <h3 className="text-sm font-black text-gray-900">
                    Administrator
                  </h3>

                  <ShieldCheck className="w-4 h-4 text-green-500" />
                </div>

                <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                  Root Access Enabled
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {open && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-[78px] w-64 bg-white border border-orange-100 rounded-3xl shadow-2xl overflow-hidden z-50"
                  >

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                          <User className="w-6 h-6" />
                        </div>

                        <div>

                          <h3 className="font-black text-lg">
                            Administrator
                          </h3>

                          <p className="text-sm text-orange-100">
                            Root System Access
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="p-3">

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 font-bold transition-all"
                      >

                        <LogOut className="w-5 h-5" />

                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}