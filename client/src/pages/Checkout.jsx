import React, { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";

import { toast } from "react-hot-toast";

import {
  MapPin,
  Phone,
  User,
  CreditCard,
  ShieldCheck,
  Lock,
  Sparkles,
  Pizza,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import { apiRequest } from "../utils/api";

export default function Checkout() {
  const navigate = useNavigate();

  const location = useLocation();

  const { clearCart } = useCart();

  const {
    items = [],
    subtotal = 0,
    grossTotal = 45,
  } = location.state || {};

  const [shippingData, setShippingData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const [isProcessing, setIsProcessing] =
    useState(false);

  const handleInputChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentGatewayTrigger =
    async (e) => {
      e.preventDefault();

      const {
        fullName,
        phone,
        address,
        city,
        postalCode,
      } = shippingData;

      if (
        !fullName ||
        !phone ||
        !address ||
        !city ||
        !postalCode
      ) {
        return toast.error(
          "Please fill complete delivery details."
        );
      }

      if (items.length === 0) {
        return toast.error(
          "Your cart is empty."
        );
      }

      setIsProcessing(true);

      const loadToastId =
        toast.loading(
          "Connecting to payment gateway..."
        );

      setTimeout(async () => {
        toast.dismiss(loadToastId);

        const sandboxSuccess =
          window.confirm(
            "--- RAZORPAY SANDBOX TEST MODE ---\n\nClick OK to simulate successful payment.\nClick Cancel to simulate failed payment."
          );

        if (!sandboxSuccess) {
          setIsProcessing(false);

          toast.error(
            "Payment transaction failed."
          );

          return;
        }

        try {
          const data = await apiRequest(
            "/orders",
            {
              method: "POST",

              body: JSON.stringify({
                items: items,

                shippingDetails:
                  shippingData,

                financials: {
                  subtotal: subtotal,
                  grossTotal:
                    grossTotal,
                },

                paymentId: `PAY-SANDBOX-${Math.random()
                  .toString(36)
                  .substr(2, 9)
                  .toUpperCase()}`,
              }),
            }
          );

          toast.success(
            "Payment successful 🎉",
            {
              icon: "💳",
            }
          );

          clearCart();

          navigate(
            `/orders?id=${data._id}`
          );
        } catch (error) {
          toast.error(
            error.message ||
              "Checkout failed."
          );
        } finally {
          setIsProcessing(false);
        }
      }, 1500);
    };

  return (
    <div className="relative overflow-hidden min-h-screen py-14">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

      {/* GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-8">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col sm:flex-row justify-between gap-6 sm:items-center"
          >

            <div>

              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Secure Checkout
              </h1>

              <p className="text-gray-500 text-lg">
                Complete your pizza order securely
              </p>
            </div>

            {/* SECURE BADGE */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[28px] px-6 py-5 shadow-xl flex items-center gap-4"
            >

              <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg">

                <Lock className="w-7 h-7" />
              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Security
                </p>

                <h3 className="text-2xl font-black text-green-600">
                  SSL Protected
                </h3>
              </div>
            </motion.div>
          </motion.div>

          {/* FORM */}
          <motion.form
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
            onSubmit={
              handlePaymentGatewayTrigger
            }
            className="bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-8 shadow-2xl"
          >

            {/* TITLE */}
            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-xl">

                <MapPin className="w-8 h-8" />
              </div>

              <div>

                <h2 className="text-3xl font-black text-gray-900">
                  Delivery Details
                </h2>

                <p className="text-gray-500">
                  Enter your shipping address
                </p>
              </div>
            </div>

            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <InputField
                icon={<User className="w-5 h-5" />}
                label="Recipient Name"
                name="fullName"
                value={shippingData.fullName}
                onChange={handleInputChange}
                placeholder="Alex Mercer"
              />

              <InputField
                icon={<Phone className="w-5 h-5" />}
                label="Phone Number"
                name="phone"
                value={shippingData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
              />
            </div>

            {/* ADDRESS */}
            <div className="mt-6">

              <InputField
                label="Street Address"
                name="address"
                value={shippingData.address}
                onChange={handleInputChange}
                placeholder="Street address, apartment, landmark..."
              />
            </div>

            {/* CITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <InputField
                label="City"
                name="city"
                value={shippingData.city}
                onChange={handleInputChange}
                placeholder="Mumbai"
              />

              <InputField
                label="Postal Code"
                name="postalCode"
                value={
                  shippingData.postalCode
                }
                onChange={handleInputChange}
                placeholder="400001"
              />
            </div>

            {/* PAYMENT BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={isProcessing}
              className="group relative overflow-hidden w-full mt-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white py-5 rounded-2xl font-bold shadow-2xl transition-all"
            >

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">

                <CreditCard className="w-5 h-5" />

                {isProcessing
                  ? "Processing Secure Payment..."
                  : `Pay ₹${grossTotal}`}
              </span>
            </motion.button>
          </motion.form>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="space-y-6"
        >

          {/* ORDER SUMMARY */}
          <div className="bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-7 shadow-2xl sticky top-28">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-7">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-xl">

                <Pizza className="w-8 h-8" />
              </div>

              <div>

                <h2 className="text-3xl font-black text-gray-900">
                  Order Summary
                </h2>

                <p className="text-gray-500">
                  Review your items
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">

              {items.map((pizza, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    x: 4,
                  }}
                  className="bg-orange-50/70 border border-orange-100 rounded-2xl p-4 flex items-start justify-between gap-4"
                >

                  <div>

                    <h3 className="font-black text-gray-900">
                      {pizza.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {pizza.details?.base}
                    </p>
                  </div>

                  <div className="text-right">

                    <h3 className="font-black text-orange-500 text-lg">
                      ₹{pizza.totalPrice}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="mt-8 space-y-4">

              <div className="flex justify-between text-gray-500 font-medium">

                <span>Subtotal</span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-500 font-medium">

                <span>Delivery & Taxes</span>

                <span>₹45</span>
              </div>

              <div className="h-px bg-orange-100" />

              <div className="flex justify-between items-center">

                <span className="text-xl font-bold text-gray-900">
                  Total
                </span>

                <span className="text-3xl font-black text-orange-500">
                  ₹{grossTotal}
                </span>
              </div>
            </div>

            {/* SECURITY */}
            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[30px] p-5 text-white shadow-2xl"
            >

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">

                  <ShieldCheck className="w-7 h-7" />
                </div>

                <div>

                  <h3 className="text-xl font-black mb-2">
                    Secure Sandbox
                  </h3>

                  <p className="text-green-100 leading-relaxed text-sm">
                    This payment gateway runs in Razorpay sandbox mode.
                    No real payment will be deducted.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* INPUT FIELD */
function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="block text-sm font-bold text-gray-700 mb-3">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500">
            {icon}
          </div>
        )}

        <input
          type="text"
          name={name}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/70 border border-orange-100 rounded-2xl py-4 ${
            icon ? "pl-14" : "pl-5"
          } pr-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm`}
        />
      </div>
    </div>
  );
}
