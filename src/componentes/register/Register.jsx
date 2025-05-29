import { useState } from 'react';
import { supabase } from '../../supabaseClient';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    communication_preference: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([form]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Usuario registrado exitosamente');
      setForm({
        username: '',
        email: '',
        password: '',
        phone: '',
        communication_preference: '',
      });
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input name="username" placeholder="Usuario" onChange={handleChange} value={form.username} />
      <input name="email" placeholder="Correo" onChange={handleChange} value={form.email} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} value={form.password} />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} value={form.phone} />
      <select name="communication_preference" onChange={handleChange} value={form.communication_preference}>
        <option value="">Selecciona preferencia</option>
        <option value="email">Correo electrónico</option>
        <option value="sms">SMS</option>
        <option value="notificaciones">Notificaciones móviles</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
