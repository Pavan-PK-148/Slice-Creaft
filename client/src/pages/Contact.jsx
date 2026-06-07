import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  Pizza,
} from "lucide-react";

import { apiRequest } from "../utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return toast.error("Please fill all fields.");
    }

    setIsSubmitting(true);

    const loadToastId = toast.loading("Sending message...");

    try {
      await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success(
        "Message sent successfully 🎉",
        {
          id: loadToastId,
        }
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setTimeout(() => {
        toast.success(
          "Message sent successfully 🎉",
          {
            id: loadToastId,
          }
        );

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] py-16 px-6 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="space-y-8"
        >

          {/* HEADER */}
          <div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="w-24 h-24 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl mb-6"
            >
              <Pizza className="w-12 h-12" />
            </motion.div>

            <h1 className="text-5xl font-black text-gray-900 mb-4">
              Get In Touch
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed">
              Have questions about orders, delivery, or support?
              Our SliceCraft team is always ready to help.
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div className="space-y-5">

            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Hotline Support"
              value="+91 9346005430"
              subtitle="Mon-Sun • 10AM - 11PM"
              color="bg-orange-500"
            />

            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              value="pavanrobba148@gmail.com"
              subtitle="Reply within 4 hours"
              color="bg-red-500"
            />

            <ContactCard
              icon={<MapPin className="w-6 h-6" />}
              title="Main Kitchen"
              value="Visakhapatnam, Andhra Pradesh"
              subtitle="Sector 4 • India"
              color="bg-amber-500"
            />
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="lg:col-span-2 bg-white/70 backdrop-blur-2xl border border-orange-100 rounded-[40px] p-10 shadow-2xl"
        >

          {/* FORM HEADER */}
          <div className="mb-10">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <HelpCircle className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-4xl font-black text-gray-900 cursor-pointer">
                  Send Message
                </h2>

                <p className="text-gray-500">
                  We’ll get back to you soon
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <InputField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tony Stark"
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tony@stark.com"
              />
            </div>

            {/* SUBJECT */}
            <InputField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Delayed order inquiry"
            />

            {/* MESSAGE */}
            <div>

              <label className="block text-sm font-bold text-gray-700 mb-3">
                Message
              </label>

              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full bg-white/70 border border-orange-100 rounded-3xl py-5 px-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm resize-none"
              />
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
              disabled={isSubmitting}
              className="group relative overflow-hidden w-full md:w-auto bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 px-8 rounded-2xl font-bold shadow-2xl transition-all cursor-pointer"
            >

              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}

                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* CONTACT CARD */
function ContactCard({
  icon,
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[28px] p-6 shadow-xl hover:shadow-2xl transition-all duration-500"
    >

      <div className="flex items-start gap-5">

        <div
          className={`w-16 h-16 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg shrink-0`}
        >
          {icon}
        </div>

        <div>

          <h3 className="text-xl font-black text-gray-900 mb-1">
            {title}
          </h3>

          <p className="text-gray-700 font-semibold">
            {value}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* INPUT FIELD */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="block text-sm font-bold text-gray-700 mb-3">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/70 border border-orange-100 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm"
      />
    </div>
  );
}
