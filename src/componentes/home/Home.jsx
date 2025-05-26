import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../carousel/Carousel";
import ProductCard from "../product_card/ProductCard";
import "./Home.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const selectedFromURL = queryParams.get("category");

  // Cargar categorías
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
        else {
          console.error("Categorías no válidas:", data);
          setCategories([]);
        }
      })
      .catch(error => {
        console.error("Error al cargar categorías:", error);
        setCategories([]);
      });
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
      .catch(error => {
        console.error("Error al cargar productos:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Filtrar productos solo por búsqueda de texto
  useEffect(() => {
    let temp = [...products];
    if (searchQuery.trim() !== "") {
      const lowerSearch = searchQuery.toLowerCase();
      temp = temp.filter(p => p.title.toLowerCase().includes(lowerSearch));
    }
    setFilteredProducts(temp);
  }, [products, searchQuery]);

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) {
      navigate("/");
    } else {
      navigate(`/?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="full-width-container">
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>

      <div className="home-container">
        <div className="inner-container">
          {loading ? (
            <p>Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            searchQuery.trim() !== "" ? (
              // Vista de lista para búsquedas
              <div className="product-list">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="product-item-search"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="product-image-container">
                      <img 
                        src={product.thumbnail || product.images?.[0]} 
                        alt={product.title}
                        className="product-image-search"
                      />
                    </div>
                    <div className="product-info-search">
                      <h3 className="product-title-search">{product.title}</h3>
                      <p className="product-description-search">{product.description}</p>
                      <div className="product-price-container">
                        <span className="product-price-search">$ {product.price.toLocaleString()}</span>
                        {product.discountPercentage > 0 && (
                          <span className="product-discount">
                            {Math.round(product.discountPercentage)}% OFF
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="product-rating-search">
                          <span className="rating-stars">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                          </span>
                          <span className="rating-number">({product.rating})</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Vista de grilla para navegación normal
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <p>No se encontraron productos que coincidan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;