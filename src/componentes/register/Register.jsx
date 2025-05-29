import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    communication_preference: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.password || !form.username) {
      setMessage({ text: 'Usuario, email y contraseña son obligatorios', type: 'error' });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage({ text: 'Por favor ingresa un email válido', type: 'error' });
      return false;
    }

    if (form.password.length < 6) {
      setMessage({ text: 'La contraseña debe tener al menos 6 caracteres', type: 'error' });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // 1. Registrar usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            username: form.username
          }
        }
      });

      if (authError) throw authError;

      // 2. Guardar datos adicionales en user_profiles
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: authData.user.id,
          username: form.username,
          phone: form.phone,
          communication_preference: form.communication_preference,
        }]);

      if (profileError) throw profileError;

      setMessage({
        text: '¡Registro exitoso! Por favor verifica tu email para confirmar la cuenta.',
        type: 'success'
      });
      
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        text: error.message || 'Ocurrió un error durante el registro',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label>Usuario</label>
        <input 
          name="username" 
          type="text" 
          placeholder="Nombre de usuario" 
          onChange={handleChange} 
          value={form.username} 
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input 
          name="email" 
          type="email" 
          placeholder="tu@email.com" 
          onChange={handleChange} 
          value={form.email} 
          required
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input 
          name="password" 
          type="password" 
          placeholder="Mínimo 6 caracteres" 
          onChange={handleChange} 
          value={form.password} 
          required
        />
      </div>

      <div className="form-group">
        <label>Teléfono (Opcional)</label>
        <input 
          name="phone" 
          type="tel" 
          placeholder="+1234567890" 
          onChange={handleChange} 
          value={form.phone} 
        />
      </div>

      <div className="form-group">
        <label>Preferencia de comunicación</label>
        <select 
          name="communication_preference" 
          onChange={handleChange} 
          value={form.communication_preference}
        >
          <option value="">Selecciona una opción</option>
          <option value="email">Correo electrónico</option>
          <option value="sms">SMS</option>
          <option value="notificaciones">Notificaciones móviles</option>
        </select>
      </div>

      <button 
        onClick={handleRegister} 
        disabled={loading}
        className="primary-button"
      >
        {loading ? 'Registrando...' : 'Crear cuenta'}
      </button>

      <div className="auth-footer">
        ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span>
      </div>
    </div>
  );
}

export default Register;