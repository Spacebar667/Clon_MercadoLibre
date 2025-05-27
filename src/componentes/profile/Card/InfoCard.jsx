// src/components/profile/InfoCard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '/workspaces/Clon_MercadoLibre/src/supabaseClient.js';

function InfoCard({ user }) {
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (data) setFullName(data.full_name || '');
    };
    loadInfo();
  }, [user]);

  const handleSave = async () => {
    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
    setMessage(error ? 'Error al guardar.' : 'Actualizado.');
  };

  return (
    <div className="card">
      <h4>Tu información</h4>
      <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nombre completo" />
      <button onClick={handleSave}>Guardar</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InfoCard;
