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
      // Verificar si el producto ya está
      const existingProduct = prevCart.find(p => p.id === product.id);
      if (existingProduct) {
        // Aumentar cantidad si existe
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      // Si no existe, agregar con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
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
