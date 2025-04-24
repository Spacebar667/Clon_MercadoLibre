// src/components/ProductCard.jsx
import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>${product.price}</h3>
      <p>{product.title}</p>
    </Link>
  );
}

export default ProductCard;
