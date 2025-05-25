// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Home from './componentes/home/Home';
import ProductDetail from './componentes/product_detail/ProductDetail';
import Cart from './componentes/cart/Cart';
import Login from './componentes/login/Login';
import Register from './componentes/register/Register';
import Profile from './componentes/profile/Profile';
import { CartProvider } from './context/CartContext'; // Contexto del carrito

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
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
