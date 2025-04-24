import { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Banner from "../componentes/Banner";
import ProductCard from "../componentes/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <div style={{ padding: '20px' }}>
        <h2>Ofertas del día</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
