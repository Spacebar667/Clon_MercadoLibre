// src/components/Header.jsx
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { supabase } from '../../supabaseClient';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Limpia el usuario del contexto
    navigate('/'); // Redirige al inicio
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">🛍️ MercadoFake</Link>
      </div>

      <div className="header-center">
        <input
          className="search"
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="user-name">👋 Hola, {user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            <Link to="/profile" className="icon-link">⚙️ Perfil</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="icon-link">👤 Entrar</Link>
            <Link to="/register" className="icon-link">📝 Registrarse</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
