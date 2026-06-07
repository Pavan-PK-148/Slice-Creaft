import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Pizza, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100 font-sans mt-auto relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LEFT BRAND */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            <motion.div
              whileHover={{
                rotate: 12,
                scale: 1.08,
              }}
              className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg"
            >

              <Pizza className="w-6 h-6" />
            </motion.div>

            <div className="text-center sm:text-left">

              <h2 className="font-black text-2xl text-gray-900 tracking-tight">
                Slice<span className="text-orange-500">Craft</span>
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Premium Pizza Experience Platform
              </p>
            </div>
          </div>

          {/* CENTER LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold">

            <Link
              to="/"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Build Pizza
            </Link>

            <Link
              to="/contact"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>

            <Link
              to="/developer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-orange-500 transition-colors"
            >

              <Code2 className="w-4 h-4" />

              Developer
            </Link>
          </div>

          {/* RIGHT SOCIALS */}
          <div className="flex items-center gap-4">

            <motion.a
              whileHover={{
                y: -3,
              }}
              href="https://github.com/Pavan-PK-148"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 flex items-center justify-center text-gray-600 hover:text-orange-500 transition-all shadow-sm"
              aria-label="GitHub Developer Profile"
            >

              <FaGithub className="text-xl" />
            </motion.a>

            <motion.a
              whileHover={{
                y: -3,
              }}
              href="https://www.linkedin.com/in/pavan-kalyan-srinivas-robba-723b43347/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 flex items-center justify-center text-gray-600 hover:text-[#0077B5] transition-all shadow-sm"
              aria-label="LinkedIn Developer Profile"
            >

              <FaLinkedin className="text-xl" />
            </motion.a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-400 text-center sm:text-left">
            © 2026 SliceCraft Inc. All rights reserved.
          </p>

          <p className="text-sm text-gray-400 text-center sm:text-right">
            Crafted by Pavan Kalyan Srinivas Robba
          </p>
        </div>
      </div>
    </footer>
  );
}
