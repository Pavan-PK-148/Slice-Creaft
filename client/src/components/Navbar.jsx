import React, {
  useState,
  useEffect,
} from "react";

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
  Sparkles,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import { toast } from "react-hot-toast";

export default function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();

  const { cartCount, clearCart } =
    useCart();

  const [userData, setUserData] =
    useState(null);

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

          setUserData(
            parsed.user || parsed
          );
        } catch (e) {
          console.error(
            "Failed parsing session:",
            e
          );

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

    toast.success(
      "Logged out successfully 🍕"
    );

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
    <nav className="sticky top-0 z-50 px-4 sm:px-8 py-4">

      {/* GLASS CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[28px] shadow-xl px-6 py-4 flex items-center justify-between relative overflow-hidden">

        {/* GLOW */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />

        {/* LOGO */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-3 group"
        >

          <motion.div
            whileHover={{
              rotate: 360,
              scale: 1.08,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-xl"
          >

            <Pizza className="w-7 h-7" />
          </motion.div>

          <div>

            <h2 className="text-2xl font-black text-gray-900 leading-none">
              SliceCraft
            </h2>

            <p className="text-xs text-orange-500 font-bold tracking-[0.2em] uppercase mt-1">
              Premium Pizza
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="hidden md:flex items-center gap-2 relative z-10">

          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >

                {/* ACTIVE BG */}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbarActive"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
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

        {/* RIGHT SIDE */}
        <div className="relative z-10 flex items-center gap-4">

          {/* CART */}
          <Link
            to="/cart"
            className="relative group"
          >

            <motion.div
              whileHover={{
                scale: 1.08,
                y: -2,
              }}
              className="w-12 h-12 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-500 flex items-center justify-center transition-all shadow-md"
            >

              <ShoppingBag className="w-5 h-5" />
            </motion.div>

            {/* BADGE */}
            {cartCount > 0 && (
              <motion.span
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] w-5 h-5 font-black rounded-full flex items-center justify-center shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* USER */}
          {userData ? (
            <div className="relative">

              {/* PROFILE BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
                className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 border border-orange-100 px-3 py-2 rounded-2xl transition-all shadow-md"
              >

                {/* AVATAR */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-black flex items-center justify-center uppercase shadow-lg">

                  {userData.name ? (
                    userData.name.charAt(0)
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                <div className="hidden sm:block text-left">

                  <p className="text-sm font-black text-gray-900 max-w-[120px] truncate">
                    {userData.name ||
                      "Account"}
                  </p>

                  <p className="text-[11px] text-gray-500 font-medium">
                    {userData.role ===
                    "admin"
                      ? "Administrator"
                      : "Customer"}
                  </p>
                </div>
              </motion.button>

              {/* DROPDOWN */}
              <AnimatePresence>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                    />

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="absolute right-0 mt-4 w-72 bg-white/90 backdrop-blur-2xl border border-orange-100 rounded-[30px] shadow-2xl overflow-hidden z-20"
                    >

                      {/* HEADER */}
                      <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black uppercase">

                            {userData.name?.charAt(
                              0
                            )}
                          </div>

                          <div>

                            <h3 className="text-xl font-black">
                              {userData.name}
                            </h3>

                            <p className="text-orange-100 text-sm truncate">
                              {userData.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* MENU */}
                      <div className="p-3">

                        {/* ADMIN */}
                        {userData.role ===
                          "admin" && (
                          <Link
                            to="/admin/products"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-amber-50 text-amber-600 font-bold transition-all"
                          >

                            <ShieldAlert className="w-5 h-5" />

                            Admin Dashboard
                          </Link>
                        )}

                        {/* HISTORY */}
                        <Link
                          to="/history"
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-gray-700 hover:text-orange-500 font-semibold transition-all"
                        >

                          <History className="w-5 h-5" />

                          Order History
                        </Link>

                        {/* LOGOUT */}
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
            /* LOGIN BUTTON */
            <Link to="/login">

              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl"
              >

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 flex items-center gap-2">

                  <Sparkles className="w-4 h-4" />

                  Login
                </span>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
