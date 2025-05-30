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
  const { user, role, loadingUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setShowDropdown(false), 200);
  };

  const handleUserMenuEnter = () => {
    clearTimeout(userMenuTimeout.current);
    setShowUserMenu(true);
  };

  const handleUserMenuLeave = () => {
    userMenuTimeout.current = setTimeout(() => setShowUserMenu(false), 200);
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Usuario";

  const getUserMenuStyles = () => ({
    position: 'absolute',
    top: '100%',
    right: 0,
    background: '#ffffff',
    border: '1px solid #cccccc',
    borderRadius: '8px',
    padding: '0.5rem',
    width: '200px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  });

  const itemStyle = {
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#f5f5f5'
  }
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
            onChange={(event) => setSearchTerm(event.target.value)}
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
            {categories.map((category, index) => (
              <li key={`category-${index}-${category}`}>
                <Link to={`/?category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </li>
            ))}
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
              className="user-menu-container"
              onMouseEnter={handleUserMenuEnter}
              onMouseLeave={handleUserMenuLeave}
            >
              <span className="user-name">
                Hola, {fullName}
              </span>
              {showUserMenu && (
                <div className="user-menu" style={getUserMenuStyles()}>
                  <div className="user-menu-header">
                    <strong>{fullName}</strong><br />
                    <span
                      onClick={() => navigate('/profile')}
                      className="profile-link"
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
                     {!loadingUser && role === 'admin' && (
                        <li
                          onClick={() => navigate('/admin/AdminPanel')}
                          className="admin-link"
                        >
                          👑 Panel Admin
                        </li>
                      )}
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