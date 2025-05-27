// src/components/profile/CommunicationCard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '/workspaces/Clon_MercadoLibre/src/supabaseClient.js';

function CommunicationCard({ user }) {
  const [communication, setCommunication] = useState('email');

  useEffect(() => {
    const fetchPreference = async () => {
      const { data } = await supabase.from('profiles').select('communication_preference').eq('id', user.id).single();
      if (data) setCommunication(data.communication_preference || 'email');
    };
    fetchPreference();
  }, [user]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setCommunication(value);
    await supabase.from('profiles').update({ communication_preference: value }).eq('id', user.id);
  };

  return (
    <div className="card">
      <h4>Comunicaciones</h4>
      <select value={communication} onChange={handleChange}>
        <option value="email">Correo electrónico</option>
        <option value="push">Notificaciones móviles</option>
        <option value="sms">SMS / WhatsApp</option>
      </select>
    </div>
  );
}

export default CommunicationCard;