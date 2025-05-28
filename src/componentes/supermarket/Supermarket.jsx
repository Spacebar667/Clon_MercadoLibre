import React, { useEffect, useState } from 'react';
import ProductCard from '../product_card/ProductCard';
import './Supermarket.css';

function Supermarket() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Cargando productos del supermercado...</p>;

  if (products.length === 0) return <p className="loading-text">No hay productos disponibles.</p>;

  return (
    <div className="supermarket-container">
      <h1>Supermercado</h1>
      <div className="supermarket-product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Supermarket;
