// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const { cart, addToCart, removeFromCart, clearProduct, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Tu carrito</h1>
        <p>No hay productos aún. ¡Empieza a comprar!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Tu carrito</h1>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Precio unitario: ${item.price.toLocaleString()}</p>
            <p>Cantidad: {item.quantity}</p>
            <div className="cart-buttons">
              <button onClick={() => addToCart(item)} title="Agregar más">➕</button>
              <button onClick={() => removeFromCart(item.id)} title="Reducir cantidad">➖</button>
              <button onClick={() => clearProduct(item.id)} title="Eliminar producto">🗑️</button>
            </div>
          </div>
        </div>
      ))}
      <h2 className="cart-total">Total: ${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
      <button className="clear-cart-btn" onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Cart;
