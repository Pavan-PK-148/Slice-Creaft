import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Pizza,
} from "lucide-react";

import { apiRequest } from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (password.length < 6) {
      return toast.error("Password minimum 6 characters.");
    }

    const loader = toast.loading("Creating account...");

    try {
      await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      toast.dismiss(loader);

      toast.success("Account created successfully 🎉");

      navigate("/login");
    } catch (err) {
      toast.dismiss(loader);

      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-6 py-14 relative overflow-hidden">

      {/* GLOWS */}
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

        {/* HEADER */}
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
            Create Account
          </h1>

          <p className="text-gray-500 text-lg">
            Join SliceCraft today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <InputField
            icon={<User className="w-5 h-5" />}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            label="Full Name"
          />

          {/* EMAIL */}
          <InputField
            icon={<Mail className="w-5 h-5" />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            label="Email Address"
          />

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-3">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          {/* CONFIRM PASSWORD */}
          <InputField
            icon={<Lock className="w-5 h-5" />}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            label="Confirm Password"
          />

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
              Register Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function InputField({
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div>

      <label className="block text-sm font-bold text-gray-700 mb-3">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white/70 border border-orange-100 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm"
        />
      </div>
    </div>
  );
}
