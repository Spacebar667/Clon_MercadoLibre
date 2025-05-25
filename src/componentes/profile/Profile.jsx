// src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Cargar datos del perfil si existen
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error al cargar perfil:', error.message);
      }

      if (data?.full_name) {
        setFullName(data.full_name);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
      });

    if (error) {
      console.error('Error al guardar perfil:', error.message);
      setMessage('Error al guardar.');
    } else {
      setMessage('Perfil actualizado exitosamente.');
    }
  };

  if (!user || loading) return <p>Cargando perfil...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>Mi Perfil</h2>
      <p><strong>Correo:</strong> {user.email}</p>

      <label>
        Nombre completo:
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
        />
      </label>

      <button onClick={handleSave} style={{ marginTop: '1rem' }}>
        Guardar cambios
      </button>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default Profile;
