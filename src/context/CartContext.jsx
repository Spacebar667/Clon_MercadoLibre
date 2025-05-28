import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos carrito desde localStorage o vacío
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar producto al carrito
  const addToCart = (product) => {
  setCart(prevCart => {
    const existingProduct = prevCart.find(p => p.id === product.id);
    if (existingProduct) {
      return prevCart.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    // Aquí le aseguramos que siempre haya "image"
    return [...prevCart, { ...product, quantity: 1, image: product.thumbnail || product.image }];
  });
};


  // Función para remover producto o disminuir cantidad
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      return prevCart
        .map(p => p.id === productId ? { ...p, quantity: p.quantity - 1 } : p)
        .filter(p => p.quantity > 0); // eliminar si cantidad es 0
    });
  };

  // Función para eliminar producto completo
  const clearProduct = (productId) => {
    setCart(prevCart => prevCart.filter(p => p.id !== productId));
  };

  // Vaciar carrito completo
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
