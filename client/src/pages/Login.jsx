import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Pizza,
} from "lucide-react";

import { apiRequest } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all credentials.");
    }

    const loader = toast.loading("Authenticating...");

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      login(data);

      toast.dismiss(loader);

      toast.success(`Welcome back ${data.name} 🍕`);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      toast.dismiss(loader);

      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-6 py-14 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-10 shadow-2xl"
      >

        {/* LOGO */}
        <div className="text-center mb-10">

          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="w-24 h-24 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Pizza className="w-12 h-12" />
          </motion.div>

          <h1 className="text-5xl font-black text-gray-900 mb-3">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-lg">
            Login to continue building your pizzas
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-3">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/70 border border-orange-100 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-3">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/70 border border-orange-100 rounded-2xl py-4 pl-14 pr-14 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            type="submit"
            className="group relative overflow-hidden w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-2xl transition-all"
          >

            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              Login Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-8">
          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-orange-500 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
