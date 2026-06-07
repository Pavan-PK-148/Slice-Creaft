import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, getSubtotal } = useCart();

  const navigate = useNavigate();

  const subtotal = getSubtotal();

  const taxAndPackaging = 45;

  const grossTotal = subtotal + taxAndPackaging;

  const handleCheckoutNavigation = () => {
    navigate("/checkout", {
      state: {
        items: cartItems,
        subtotal,
        grossTotal,
      },
    });
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-6 relative overflow-hidden">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative z-10 bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[40px] p-12 shadow-2xl max-w-xl text-center"
        >

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="w-28 h-28 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <ShoppingBag className="w-14 h-14" />
          </motion.div>

          <h2 className="text-5xl font-black text-gray-900 mb-5">
            Your Cart Is Empty
          </h2>

          <p className="text-gray-500 leading-relaxed text-lg max-w-md mx-auto">
            You haven't added any delicious pizza creations yet.
            Start building your dream pizza now.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Building Pizza
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // CART PAGE
  return (
    <div className="min-h-screen bg-[#fff8f3] py-14 px-6 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* CART ITEMS */}
        <div className="lg:col-span-2">

          <div className="mb-8">
            <h1 className="text-5xl font-black text-gray-900 mb-3">
              Shopping Cart
            </h1>

            <p className="text-gray-500 text-lg">
              Review your delicious pizza creations before checkout.
            </p>
          </div>

          <div className="space-y-6">

            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[32px] p-7 shadow-xl hover:shadow-2xl transition-all duration-500"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                  {/* DETAILS */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-3">
                          {item.name}
                        </h2>

                        <div className="space-y-2 text-gray-600">

                          <p>
                            <span className="font-bold text-orange-500">
                              Base:
                            </span>{" "}
                            {item.details?.base || "Standard"}
                          </p>

                          <p>
                            <span className="font-bold text-orange-500">
                              Sauce:
                            </span>{" "}
                            {item.details?.sauce || "None"}
                          </p>

                          <p>
                            <span className="font-bold text-orange-500">
                              Cheese:
                            </span>{" "}
                            {item.details?.cheese || "None"}
                          </p>

                          {((item.details?.veggies?.length > 0) ||
                            (item.details?.meats?.length > 0)) && (
                            <p className="leading-relaxed">
                              <span className="font-bold text-orange-500">
                                Toppings:
                              </span>{" "}
                              {[
                                ...(item.details?.veggies || []),
                                ...(item.details?.meats || []),
                              ].join(", ")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* REMOVE */}
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => removeFromCart(item.id)}
                        className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="flex flex-row lg:flex-col items-center justify-between lg:items-end gap-3">

                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                      Total
                    </p>

                    <h2 className="text-4xl font-black text-gray-900">
                      ₹{item.totalPrice}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="sticky top-8 bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[35px] p-8 shadow-2xl"
        >

          <div className="mb-8">

            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Order Summary
            </h2>

            <p className="text-gray-500">
              Final payment details
            </p>
          </div>

          <div className="space-y-5">

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Basket Subtotal
              </span>

              <span className="font-bold text-gray-900">
                ₹{subtotal}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Packaging & GST
              </span>

              <span className="font-bold text-gray-900">
                ₹{taxAndPackaging}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="font-bold text-green-600">
                FREE
              </span>
            </div>

            <div className="border-t border-orange-100 pt-6 flex justify-between items-center">

              <div>
                <p className="text-sm text-gray-500">
                  Grand Total
                </p>

                <h2 className="text-5xl font-black text-gray-900">
                  ₹{grossTotal}
                </h2>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleCheckoutNavigation}
              className="group relative overflow-hidden w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold shadow-xl transition-all cursor-pointer"
            >

              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                Proceed To Checkout
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
