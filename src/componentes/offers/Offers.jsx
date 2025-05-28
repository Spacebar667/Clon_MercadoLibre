import React, { useState, useEffect } from 'react';
import ProductCard from '../product_card/ProductCard'; // ajusta la ruta si es necesario
import './Offers.css';

function Offers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando ofertas...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtrar solo productos con descuento
  const offers = products.filter(
    product => product.discountPercentage && product.discountPercentage > 0
  );

  if (offers.length === 0) return <p>No hay ofertas disponibles.</p>;

  return (
    <div className="offers-container">
      {offers.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Offers;
