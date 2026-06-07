// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart items from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('slicecraft_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('slicecraft_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pizzaBlueprint) => {
    setCartItems((prevItems) => {
      // Create a unique identifier based on chosen configurations to stack identical builds
      const uniqueId = `${pizzaBlueprint.id || Date.now()}`;
      return [...prevItems, { ...pizzaBlueprint, id: uniqueId }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('slicecraft_cart');
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
  };

  // Derived total item count to feed the animated Navbar badge bubble
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      clearCart,
      getSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a clean CartProvider wrapper');
  }
  return context;
}