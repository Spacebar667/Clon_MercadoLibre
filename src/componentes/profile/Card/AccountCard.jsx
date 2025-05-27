// src/components/profile/AccountCard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '/workspaces/Clon_MercadoLibre/src/supabaseClient.js';

function AccountCard({ user }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from('profiles').select('username, phone').eq('id', user.id).single();
      if (data) {
        setUsername(data.username || '');
        setPhone(data.phone || '');
      }
    };
    loadData();
  }, [user]);

  const handleSave = async () => {
    await supabase.from('profiles').update({ username, phone }).eq('id', user.id);
  };

  return (
    <div className="card">
      <h4>Datos de tu cuenta</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre de usuario" />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}

export default AccountCard;