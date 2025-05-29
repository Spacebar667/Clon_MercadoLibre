// src/componentes/profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setProfile({
            ...data,
            email: user.email
          });
        } else {
          setProfile({
            id: user.id,
            email: user.email
          });
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div>Cargando perfil...</div>;
  if (!profile) return <div>No se pudo cargar el perfil</div>;

  return (
    <div className="profile-container">
      <aside className="profile-menu">
        <ul>
          <li><Link to="/profile">Perfil General</Link></li>
          <li><Link to="/profile/user-info">Información de Usuario</Link></li>
          <li><Link to="/profile/account-data">Datos de Cuenta</Link></li>
          <li><Link to="/profile/cards">Tarjetas</Link></li>
          <li><Link to="/profile/addresses">Direcciones</Link></li>
          <li><Link to="/profile/communications">Comunicaciones</Link></li>
          <li><Link to="/compras">Compras</Link></li>
          <li><Link to="/historial">Historial</Link></li>
          <li><Link to="/preguntas">Preguntas</Link></li>
          <li><Link to="/opiniones">Opiniones</Link></li>
          <li><Link to="/suscripciones">Suscripciones</Link></li>
          <li><Link to="/mercado-play">Mercado Play</Link></li>
          <li><Link to="/vender">Vender</Link></li>
        </ul>
      </aside>

      <main className="profile-content">
        <Outlet context={{ profile, setProfile }} />
      </main>
    </div>
  );
};

export default Profile;
