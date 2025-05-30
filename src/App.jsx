// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Home from './componentes/home/Home';
import ProductDetail from './componentes/product_detail/ProductDetail';
import Cart from './componentes/cart/Cart';
import Login from './componentes/login/Login';
import Register from './componentes/register/Register';
import Profile from './componentes/profile/Profile'; // cuadrícula de opciones
import UserInfo from './componentes/profile/UserInfo';
import AccountData from './componentes/profile/AccountData';
import CardsComponent from './componentes/profile/CardsComponent';
import AddressesComponent from './componentes/profile/AddressesComponent';
import CommunicationsComponent from './componentes/profile/CommunicationsComponent';
import Security from './componentes/profile/Security';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PurchaseProvider } from './context/PurchaseContext';
import { UserProvider } from './context/UserContext';

import AdminPanel from './componentes/admin/AdminPanel';
import Prueba from './componentes/prueba/Prueba';

import Supermarket from './componentes/supermarket/Supermarket';
import Offers from './componentes/offers/Offers';
import Compras from './componentes/compras/Compras';
import Historial from './componentes/historial/Historial';
import Preguntas from './componentes/preguntas/Preguntas';
import Opiniones from './componentes/opiniones/Opiniones';
import Suscripciones from './componentes/suscripciones/Suscripciones';
import MercadoPlay from './componentes/mercadoplay/MercadoPlay';
import Vender from './componentes/vender/Vender';

function App() {
  return (
    <AuthProvider>
      <PurchaseProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="supermarket" element={<Supermarket />} />
                <Route path="offers" element={<Offers />} />
                <Route path="prueba" element={<Prueba />} />
                <Route path="compras" element={<Compras />} />
                <Route path="historial" element={<Historial />} />
                <Route path="preguntas" element={<Preguntas />} />
                <Route path="opiniones" element={<Opiniones />} />
                <Route path="suscripciones" element={<Suscripciones />} />
                <Route path="mercado-play" element={<MercadoPlay />} />
                <Route path="vender" element={<Vender />} />

                {/* Rutas del perfil */}
                <Route path="profile" element={<Profile />} />
                <Route path="profile/UserInfo" element={<UserInfo />} />
                <Route path="profile/account-data" element={<AccountData />} />
                <Route path="profile/cards" element={<CardsComponent />} />
                <Route path="profile/addresses" element={<AddressesComponent />} />
                <Route path="profile/communications" element={<CommunicationsComponent />} />
                <Route path="profile/security" element={<Security />} />

                {/* Panel de administración */}
                <Route path="admin/AdminPanel" element={<AdminPanel />} />
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </PurchaseProvider>
    </AuthProvider>
  );
}

export default App;
