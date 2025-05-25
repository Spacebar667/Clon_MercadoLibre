// src/components/ProductCard.jsx
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>${product.price}</h3>
        <p>{product.title}</p>
      </Link>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
