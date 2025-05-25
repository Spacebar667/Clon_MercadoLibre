// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const { cart, addToCart, removeFromCart, clearProduct, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div>
        <h1>Tu carrito</h1>
        <p>No hay productos aún.</p>
      </div>
    );
  }

 // en tu componente Cart.jsx

return (
    <div className="cart-container">
        <h1>Tu carrito</h1>
        {cart.map(item => (
        <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Precio unitario: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <div className="cart-buttons">
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <button onClick={() => clearProduct(item.id)}>Eliminar</button>
            </div>
            </div>
        </div>
        ))}
        <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>
        <button className="clear-cart-btn" onClick={clearCart}>Vaciar carrito</button>
    </div>
    );
}

export default Cart;
