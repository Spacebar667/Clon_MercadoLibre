// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "../banner/Banner";
import ProductCard from "../product_card/ProductCard";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Extraer search desde query string
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "https://fakestoreapi.com/products";
    if (selectedCategory) {
      url = `https://fakestoreapi.com/products/category/${encodeURIComponent(selectedCategory)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    let temp = [...products];

    if (minPrice !== "") {
      temp = temp.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      temp = temp.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (searchQuery.trim() !== "") {
      const lowerSearch = searchQuery.toLowerCase();
      temp = temp.filter(p => p.title.toLowerCase().includes(lowerSearch));
    }

    setFilteredProducts(temp);
  }, [products, minPrice, maxPrice, searchQuery]);

  return (
    <div className="home-container">
      <div className="inner-container">
        <Banner />

        <div className="categories">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`category-button ${selectedCategory === null ? "active" : ""}`}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-button ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>

        <h2 className="category-title">
          {selectedCategory ? `Productos en "${selectedCategory}"` : "Ofertas del día"}
        </h2>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No se encontraron productos que coincidan.</p>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
