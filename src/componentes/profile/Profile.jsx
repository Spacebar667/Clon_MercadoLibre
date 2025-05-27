// src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, username, phone, communication_preference')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error al cargar perfil:', error.message);
        setMessage('Error al cargar perfil');
      }

      if (data) {
        setProfile(data);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user, navigate]);

  if (!user || loading) return <p>Cargando perfil...</p>;

  const openTab = (path) => {
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Mi Perfil</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          gridAutoRows: 'minmax(120px, auto)',
          cursor: 'pointer',
        }}
      >
        <div onClick={() => openTab('/profile/Card/InfoCard')} style={cardStyle}>
          <h3>Tu información</h3>
          <p>Ver y editar tu nombre completo.</p>
        </div>
        <div onClick={() => openTab('/profile/cuenta')} style={cardStyle}>
          <h3>Datos de tu cuenta</h3>
          <p>Usuario y teléfono.</p>
        </div>
        <div onClick={() => openTab('/profile/seguridad')} style={cardStyle}>
          <h3>Seguridad</h3>
          <p>Cambiar tu contraseña.</p>
        </div>
        <div onClick={() => openTab('/profile/tarjetas')} style={cardStyle}>
          <h3>Tarjetas</h3>
          <p>Gestionar tarjetas guardadas.</p>
        </div>
        <div onClick={() => openTab('/profile/direcciones')} style={cardStyle}>
          <h3>Direcciones</h3>
          <p>Gestionar direcciones guardadas.</p>
        </div>
        <div onClick={() => openTab('/profile/privacidad')} style={cardStyle}>
          <h3>Privacidad</h3>
          <p>Configurar opciones de privacidad.</p>
        </div>
        <div onClick={() => openTab('/profile/comunicaciones')} style={cardStyle}>
          <h3>Comunicaciones</h3>
          <p>Preferencias de comunicación.</p>
        </div>
      </div>
      {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

const cardStyle = {
  background: '#f5f5f5',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  userSelect: 'none',
};

export default Profile;
