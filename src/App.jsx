// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Home from './componentes/home/Home';
import ProductDetail from './componentes/product_detail/ProductDetail';
import Cart from './componentes/cart/Cart';
import Login from './componentes/login/Login';
import Register from './componentes/register/Register';
import Profile from './componentes/profile/Profile';

// Importa componentes para las pestañas del perfil
import InfoCard from './componentes/profile/Card/InfoCard';
import AccountCard from './componentes/profile/Card/AccountCard';
import CardsCard from './componentes/profile/Card/CardsCard';
import AddressesCard from './componentes/profile/Card/AddressesCard';
import CommunicationCard from './componentes/profile/Card/CommunicationCard';

// Importa componentes nuevos
import Offers from './componentes/offers/Offers';
import Supermarket from './componentes/supermarket/Supermarket';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Rutas nuevas */}
            <Route path="offers" element={<Offers />} />
            <Route path="supermarket" element={<Supermarket />} />

            {/* Rutas de perfil con subrutas */}
            <Route path="profile" element={<Profile />}>
              <Route index element={<InfoCard />} />
              <Route path="info" element={<InfoCard />} />
              <Route path="cuenta" element={<AccountCard />} />
              <Route path="tarjetas" element={<CardsCard />} />
              <Route path="direcciones" element={<AddressesCard />} />
              <Route path="comunicaciones" element={<CommunicationCard />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
