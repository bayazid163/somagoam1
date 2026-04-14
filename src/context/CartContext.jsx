import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage on startup
    const savedCart = localStorage.getItem('somagom_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Integration: Automatically calculate the total price of the collection
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem('somagom_cart', JSON.stringify(cartItems));
    
    // Integration: Logic to keep the subtotal updated for the Cart sidebar
    const newTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setCartTotal(newTotal);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Integration: Check by ID if available, otherwise fallback to Name
      const productId = product.id || product.name;
      const exists = prev.find((item) => (item.id || item.name) === productId);
      
      if (exists) {
        return prev.map((item) =>
          (item.id || item.name) === productId ? { ...item, qty: item.qty + (product.quantity || 1) } : item
        );
      }
      return [...prev, { ...product, qty: product.quantity || 1 }];
    });
  };

  // Integration: Updated to handle both Name and ID-based removal
  const removeFromCart = (idOrName) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item.name) !== idOrName));
  };

  // Integration: New function to handle plus/minus buttons in the Cart.jsx
  const updateQuantity = (idOrName, newQty) => {
    if (newQty < 1) {
      removeFromCart(idOrName);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id || item.name) === idOrName ? { ...item, qty: newQty } : item
      )
    );
  };

  // Integration: Clear cart after successful payment
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('somagom_cart');
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);