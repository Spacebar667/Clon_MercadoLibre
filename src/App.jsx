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
import Administrador from './componentes/admin/Administrador';

// Importar componentes de perfiles
import UserInfo from './componentes/profiles_comps/UserInfo';
import AccountData from './componentes/profiles_comps/AccountData';
import CardsComponent from './componentes/profiles_comps/CardsComponent';
import AddressesComponent from './componentes/profiles_comps/AddressesComponent';
import CommunicationsComponent from './componentes/profiles_comps/CommunicationsComponent';

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
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileGrid />} />
              <Route path="user-info" element={<UserInfo />} />
              <Route path="account-data" element={<AccountData />} />
              <Route path="cards" element={<CardsComponent />} />
              <Route path="addresses" element={<AddressesComponent />} />
              <Route path="communications" element={<CommunicationsComponent />} />
              <Route path="admin" element={<Administrador />} />

            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;