import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Core State and Pages
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Added

import Home from './pages/Home';
import Products from './pages/Products.jsx';
import Orders from './pages/Orders'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound'; // Added
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';

// Admin Pages (matching your file spelling configuration variants)
import AdminDashboard from './pages/admin/AdminDashboard.jsx'; 
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import Developer from './pages/Developer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const PaymentSuccess = () => <div className="text-center p-20 text-green-600 font-heading text-3xl">Payment Successful!</div>;
const PaymentFailure = () => <div className="text-center p-20 text-primary font-heading text-3xl">Payment Failed!</div>;

// Component to shield admin nodes: drops an implicit 404 layout frame if validation fails
function AdminRouteShield() {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <NotFound />;
  }
  return <Outlet />;
}

function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow"><Outlet /></main>
      <Footer />
    </div>
  );
}

function AdminAreaLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <AdminNavbar />
      <main className="flex-grow"><Outlet /></main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap with authentication wrapper */}
        <CartProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{ style: { fontFamily: 'var(--font-sans)', fontWeight: '500' } }}
          />
          <ScrollToTop />
          <Routes>
            {/* PUBLIC STOREFRONT RUNWAYS */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/history" element={<OrderHistory />} />
              <Route path="/developer" element={<Developer />} />
            </Route>

            {/* HOOKING THE ADMIN SHIELD FOR ISOLATION CONTROL */}
            <Route element={<AdminRouteShield />}>
              <Route element={<AdminAreaLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
              </Route>
            </Route>

            {/* 404 ROUTE CHANNELS */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}