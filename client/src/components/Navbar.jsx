
import React, { useState, useEffect } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ShoppingBag,
  Pizza,
  User,
  PhoneCall,
  History,
  LogOut,
  ShieldAlert,
  Code2,
  ChevronDown,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import { toast } from "react-hot-toast";

export default function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();

  const { cartCount, clearCart } = useCart();

  const [userData, setUserData] = useState(null);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  useEffect(() => {
    const syncUserSession = () => {
      const storedUser =
        localStorage.getItem(
          "slicecraft_user"
        );

      if (storedUser) {
        try {
          const parsed =
            JSON.parse(storedUser);

          setUserData(parsed.user || parsed);
        } catch (e) {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };

    syncUserSession();

    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem(
      "slicecraft_user"
    );

    setUserData(null);

    clearCart();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const navLinks = [
    {
      path: "/",
      name: "Home",
      icon: Pizza,
    },

    {
      path: "/products",
      name: "Build Pizza",
      icon: Pizza,
    },

    ...(userData
      ? [
          {
            path: "/history",
            name: "My Orders",
            icon: History,
          },
        ]
      : []),

    {
      path: "/contact",
      name: "Contact",
      icon: PhoneCall,
    },
  ];

  const isActive = (path) =>
    location.pathname === path;

  return (
    <header className="sticky top-0 z-[9999] px-4 sm:px-8 pt-5">

      <nav className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-orange-100 rounded-[30px] shadow-xl overflow-visible relative">

        {/* INNER */}
        <div className="h-[92px] px-6 flex items-center justify-between">

          {/* LEFT */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >

            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.05,
              }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg"
            >

              <Pizza className="w-8 h-8 text-white" />
            </motion.div>

            <div>

              <h2 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
                SliceCraft
              </h2>

              <p className="text-xs text-orange-500 font-bold tracking-[0.3em] uppercase mt-2">
                Premium Pizza
              </p>
            </div>
          </Link>

          {/* CENTER NAV */}
          <div className="hidden lg:flex items-center gap-2">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >

                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbarActive"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg"
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">

                    <Icon className="w-4 h-4" />

                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <Link
              to="/cart"
              className="relative"
            >

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shadow-md"
              >

                <ShoppingBag className="w-5 h-5" />
              </motion.div>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {userData ? (
              <div className="relative">

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                  className="flex items-center gap-3 bg-orange-50 border border-orange-100 px-4 py-2 rounded-2xl shadow-md hover:bg-orange-100 transition-all"
                >

                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                    {userData.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  {/* TEXT */}
                  <div className="hidden sm:block text-left">

                    <h4 className="font-black text-gray-900 text-sm leading-none">
                      {userData.name}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {userData.role ===
                      "admin"
                        ? "Administrator"
                        : "Customer"}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      dropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </motion.button>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() =>
                          setDropdownOpen(
                            false
                          )
                        }
                      />

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 12,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 12,
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="absolute right-0 top-[80px] w-72 bg-white border border-orange-100 rounded-[28px] shadow-2xl overflow-hidden z-50"
                      >

                        {/* HEADER */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">

                          <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl uppercase">
                              {userData.name?.charAt(
                                0
                              )}
                            </div>

                            <div>

                              <h3 className="font-black text-lg">
                                {userData.name}
                              </h3>

                              <p className="text-sm text-orange-100 truncate">
                                {userData.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* ITEMS */}
                        <div className="p-3">

                          {userData.role ===
                            "admin" && (
                            <Link
                              to="/admin/dashboard"
                              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-orange-600 font-bold transition-all"
                            >

                              <ShieldAlert className="w-5 h-5" />

                              Admin Dashboard
                            </Link>
                          )}

                          <Link
                            to="/history"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-gray-700 font-semibold transition-all"
                          >

                            <History className="w-5 h-5" />

                            Order History
                          </Link>

                          <Link
                            to="/developer"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-gray-700 font-semibold transition-all"
                          >

                            <Code2 className="w-5 h-5" />

                            Developer
                          </Link>

                          <button
                            onClick={
                              handleLogout
                            }
                            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 font-bold transition-all"
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
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
