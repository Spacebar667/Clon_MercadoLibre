import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Nuevo wrapper */}
      <div className="inner-container">
        <header className="header">
          <h1 className="logo">Mercado Clon</h1>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-bar"
          />
          <button className="search-button">Buscar</button>
        </header>

        <main className="main">
          <h2>Productos destacados</h2>
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="product-card">
                <img
                  src={`https://via.placeholder.com/150`}
                  alt={`Producto #${id}`}
                />
                <h3>Producto #{id}</h3>
                <p>$9.999</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;