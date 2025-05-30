import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../carousel/Carousel";
import ProductCard from "../product_card/ProductCard";

import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import "./Home.css";
import Prueba from "../prueba/Prueba";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth();

  const [showAdded, setShowAdded] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const selectedFromURL = queryParams.get("category");

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const cats = data.filter(item => typeof item === "string");
          setCategories(cats);
        } else {
          setCategories([]);
        }
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setSelectedCategory(selectedFromURL || null);
  }, [selectedFromURL]);

  useEffect(() => {
    setLoading(true);
    let url = selectedCategory
      ? `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}?limit=100`
      : "https://dummyjson.com/products?limit=100";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const productsArray = Array.isArray(data.products) ? data.products : [];
        setProducts(productsArray);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    let temp = [...products];
    if (searchQuery.trim() !== "") {
      const lowerSearch = searchQuery.toLowerCase();
      temp = temp.filter(p => p.title.toLowerCase().includes(lowerSearch));
    }
    setFilteredProducts(temp);
  }, [products, searchQuery]);

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      navigate("/");
    } else {
      navigate(`/?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { message: "Debes tener cuenta para agregar al carrito" } });
      return;
    }
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="home-wrapper">
      <div className="full-width-container">
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>
      <Prueba />
      <div className="home-container">
        <nav className="category-list" aria-label="Lista de categorías">
          <ul>
            {categories.map(cat => (
              <li
                key={cat}
                className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleCategoryClick(cat)}
              >
                <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                <span className="arrow">{selectedCategory === cat ? "▼" : "→"}</span>
              </li>
            ))}
          </ul>
        </nav>

        {showAdded && (
          <div className="added-notification">
            Producto añadido al carrito ✔️
          </div>
        )}

        <section className="products-display" aria-live="polite">
          {loading ? (
            <p>Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            searchQuery.trim() !== "" ? (
              // Vista lista para búsqueda
              <ul className="product-list" role="list">
                {filteredProducts.map(product => (
                  <li key={product.id} className="product-item-search">
                    <img 
                      src={product.thumbnail || product.images?.[0]} 
                      alt={product.title}
                      className="product-image-search"
                      loading="lazy"
                    />
                    <div className="product-info-search">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <div className="product-price-container">
                        <span className="product-price-search">${product.price.toLocaleString()}</span>
                        {product.discountPercentage > 0 && (
                          <span className="product-discount">
                            {Math.round(product.discountPercentage)}% OFF
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="product-rating-search" aria-label={`Valoración: ${product.rating} de 5`}>
                          <span className="rating-stars" aria-hidden="true">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                          </span>
                          <span className="rating-number">({product.rating.toFixed(1)})</span>
                        </div>
                      )}
                      <button onClick={() => navigate(`/product/${product.id}`)} className="btn-view-product">
                        Ver detalle
                      </button>
                      <button 
                        onClick={() => handleAddToCart(product)} 
                        className="btn-add-to-cart-search"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              // Vista grilla normal
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)} 
                  />
                ))}
              </div>
            )
          ) : (
            <p>No se encontraron productos que coincidan.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
