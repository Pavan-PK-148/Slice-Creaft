import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  ShoppingBag,
  Pizza,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
  title,
  subtitle,
}) {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Overview Status",
    },

    {
      to: "/admin/orders",
      icon: ShoppingBag,
      label: "Live Order Queue",
    },

    {
      to: "/admin/products",
      icon: Pizza,
      label: "Inventory",
    },

    {
      to: "/admin/analytics",
      icon: BarChart3,
      label: "Performance Metrics",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">

        <div>

          <h3 className="text-sm font-black text-red-500 uppercase tracking-widest">
            SliceCraft Central
          </h3>

          <p className="text-[11px] text-gray-400 font-medium">
            Admin Control
          </p>
        </div>

        <button
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
          className="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-sm"
        >

          {mobileMenu ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="lg:hidden overflow-hidden mb-6"
          >

            <aside className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">

              <nav className="flex flex-col gap-2">

                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className={({
                        isActive,
                      }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-red-500 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                    >

                      <Icon className="w-4 h-4" />

                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block bg-white border border-gray-200 p-5 rounded-3xl shadow-sm sticky top-28">

          <div className="mb-6">

            <h3 className="text-xs font-black text-red-500 tracking-widest uppercase">
              SliceCraft Central
            </h3>

            <p className="text-[11px] text-gray-400 font-medium mt-1">
              Core Administration Layer
            </p>
          </div>

          <nav className="flex flex-col gap-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({
                    isActive,
                  }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-red-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >

                  <Icon className="w-4 h-4 shrink-0" />

                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* PAGE HEADER */}
          <div className="bg-white border border-gray-200 rounded-3xl px-6 py-5 shadow-sm">

            <h2 className="text-3xl font-black text-gray-900">
              {title}
            </h2>

            <p className="text-sm text-gray-500 mt-2 font-medium">
              {subtitle}
            </p>
          </div>

          {/* PAGE CONTENT */}
          <motion.main
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >

            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
