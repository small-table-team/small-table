import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      // dedupe by id + cateringId to allow same item id from different caterings
      if (prev.find((i) => i.id === item.id && String(i.cateringId) === String(item.cateringId))) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id, cateringId) => {
    // remove matching item by id and cateringId (if provided)
    setItems((prev) => prev.filter((i) => !(i.id === id && (cateringId == null || String(i.cateringId) === String(cateringId)))));
  };

  const removeCatering = (cateringId) => {
    setItems((prev) => prev.filter((i) => String(i.cateringId) !== String(cateringId)));
  };

  const clearCart = () => setItems([]);

  const isInCart = (id) => items.some((i) => i.id === id);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, removeCatering, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
