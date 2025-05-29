import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { supabase } from '../../supabaseClient';
import './Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const hoverTimeout = useRef(null);
  const userMenuTimeout = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Temporalmente usa categorías hardcodeadas para evitar problemas con la API
    const hardcodedCategories = [
      'beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration',
      'kitchen-accessories', 'laptops', 'mens-shirts', 'mens-shoes', 'mens-watches',
      'mobile-accessories', 'motorcycle', 'skin-care', 'smartphones', 'sports-accessories',
      'sunglasses', 'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses',
      'womens-jewellery', 'womens-shoes', 'womens-watches'
    ];
    
    setCategories(hardcodedCategories);
  }, []);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    // Añadir un pequeño delay antes de ocultar para permitir transición suave
    hoverTimeout.current = setTimeout(() => setShowDropdown(false), 200);
  };

  const handleUserMenuEnter = () => {
    if (userMenuTimeout.current) {
      clearTimeout(userMenuTimeout.current);
    }
    setShowUserMenu(true);
  };

  const handleUserMenuLeave = () => {
    if (userMenuTimeout.current) {
      clearTimeout(userMenuTimeout.current);
    }
    userMenuTimeout.current = setTimeout(() => setShowUserMenu(false), 200);
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Usuario";

  const itemStyle = {
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
    color: '#333',
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo" aria-label="Página principal">
          <img
            src="https://i.ibb.co/m5c8hgRx/Image-mercado-logo.png"
            alt="Logo Mercado"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="header-center">
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Buscar productos, marcas y más..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Buscar productos"
          />
          <button
            className="search-btn"
            onClick={handleSearch}
            aria-label="Buscar"
            type="button"
          >
            🔍
          </button>
        </div>
      </div>

      <div className="header-right">
        <nav
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: 'relative' }}
          aria-haspopup="true"
          aria-expanded={showDropdown}
        >
          <span
            className="text-link"
            tabIndex={0}
            role="button"
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
          >
            Categorías
          </span>
          <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
            {categories.map((category, index) => {
              // Asegurar que category es un string
              const categoryString = typeof category === 'string' ? category : String(category);
              
              return (
                <li key={`category-${index}-${categoryString}`}>
                  <Link to={`/?category=${encodeURIComponent(categoryString)}`}>
                    {categoryString}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link to="/offers" className="text-link">
          Ofertas
        </Link>
        <Link to="/supermarket" className="text-link">
          Supermercado
        </Link>

        {user ? (
          <>
            <div
              onMouseEnter={handleUserMenuEnter}
              onMouseLeave={handleUserMenuLeave}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <span className="user-name" aria-label={`Usuario: ${fullName}`}>
                Hola, {fullName}
              </span>
              {showUserMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    width: '200px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 10
                  }}
                >
                  <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee' }}>
                    <strong>{fullName}</strong><br />
                    <span
                      onClick={() => navigate('/profile')}
                      style={{ color: '#007bff', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      Mi perfil
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
                    <li onClick={() => navigate('/historial')} style={itemStyle}>Historial</li>
                    <li onClick={() => navigate('/preguntas')} style={itemStyle}>Preguntas</li>
                    <li onClick={() => navigate('/opiniones')} style={itemStyle}>Opiniones</li>
                    <li onClick={() => navigate('/suscripciones')} style={itemStyle}>Suscripciones</li>
                    <li onClick={() => navigate('/mercado-play')} style={itemStyle}>Mercado Play</li>
                    <li onClick={() => navigate('/vender')} style={itemStyle}>Vender</li>
                    <li onClick={handleLogout} style={{ ...itemStyle, color: 'red' }}>Salir</li>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/cart" className="icon-link" aria-label="Carrito de compras">
              🛒
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-link">
              Entrar
            </Link>
            <Link to="/register" className="text-link">
              Crear cuenta
            </Link>
            <Link to="/cart" className="icon-link" aria-label="Carrito de compras">
              🛒
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;