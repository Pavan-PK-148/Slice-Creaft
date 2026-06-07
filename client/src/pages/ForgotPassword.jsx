import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, ChevronLeft, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please specify your registered account email.");
    }
    
    toast.success("Password reset matrix link dispatched! Inspect your email inbox.");
    setEmail('');
  };

  return (
    <div className="max-w-md w-full mx-auto my-24 px-4 sm:px-0 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface p-8 rounded-3xl border border-gray-100 shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-xs text-gray-400 mt-2 font-sans px-2">
            Provide your account registration mail details, and we will send a tokenized payload link to override your credential setups safely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Account Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-background border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-hidden focus:border-primary transition-colors font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-primary-light transition-all flex items-center justify-center"
          >
            Send Reset Instructions
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Login View
          </Link>
        </div>
      </motion.div>
    </div>
  );
}