import './ProductCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useAuth } from "../../context/AuthContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth(); // <-- aquí, usa el hook useAuth
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { message: "Debes tener cuenta para agregar al carrito" } });
      return;
    }
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="image-wrapper">
          <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toLocaleString()}</p>
          {product.discountPercentage > 0 && (
            <span className="product-discount">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>
      </Link>
      <button 
        className="btn-add-cart" 
        onClick={handleAddToCart}
        aria-label={`Agregar ${product.title} al carrito`}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
