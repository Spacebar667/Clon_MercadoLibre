// src/components/Header.jsx
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">MercadoFake</Link>
      <input className="search" type="text" placeholder="Buscar productos..." />
      <div className="icons">
        <Link to="/cart">🛒</Link>
        <Link to="/profile">👤</Link>
      </div>
    </header>
  );
}

export default Header;
