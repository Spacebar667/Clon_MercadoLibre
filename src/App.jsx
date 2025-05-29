// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Home from './componentes/home/Home';
import ProductDetail from './componentes/product_detail/ProductDetail';
import Cart from './componentes/cart/Cart';
import Login from './componentes/login/Login';
import Register from './componentes/register/Register';
import Profile from './componentes/profile/Profile';
import ProfileGrid from './componentes/profile/ProfileGrid';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PurchaseProvider } from "./context/PurchaseContext";
import Administrador from './componentes/admin/Administrador';

// Componentes del perfil
import UserInfo from './componentes/profiles_comps/UserInfo';
import AccountData from './componentes/profiles_comps/AccountData';
import CardsComponent from './componentes/profiles_comps/CardsComponent';
import AddressesComponent from './componentes/profiles_comps/AddressesComponent';
import CommunicationsComponent from './componentes/profiles_comps/CommunicationsComponent';

// Rutas externas a profile
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

              {/* Rutas del perfil */}
              <Route path="profile" element={<Profile />}>
                <Route index element={<ProfileGrid />} />
                <Route path="user-info" element={<UserInfo />} />
                <Route path="account-data" element={<AccountData />} />
                <Route path="cards" element={<CardsComponent />} />
                <Route path="addresses" element={<AddressesComponent />} />
                <Route path="communications" element={<CommunicationsComponent />} />
                <Route path="admin" element={<Administrador />} />
              </Route>

              {/* Rutas externas al perfil */}
              <Route path="compras" element={<Compras />} />
              <Route path="historial" element={<Historial />} />
              <Route path="preguntas" element={<Preguntas />} />
              <Route path="opiniones" element={<Opiniones />} />
              <Route path="suscripciones" element={<Suscripciones />} />
              <Route path="mercado-play" element={<MercadoPlay />} />
              <Route path="vender" element={<Vender />} />
            </Route>
          </Routes>
        </CartProvider>
      </PurchaseProvider>
    </AuthProvider>
  );
}

export default App;
