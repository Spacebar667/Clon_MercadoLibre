// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';  // Importa tu contexto

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
