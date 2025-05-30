import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Communications = () => {
  const [preference, setPreference] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('user_profiles')
        .select('communication_preference')
        .eq('id', user.id)
        .single();
      setPreference(data?.communication_preference || '');
    };
    fetchData();
  }, []);

  const updatePreference = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('user_profiles')
      .update({ communication_preference: preference })
      .eq('id', user.id);
    setMessage(error ? 'Error actualizando' : 'Preferencia actualizada');
  };

  return (
    <div className="p-4">
      <label className="block mb-2 font-semibold">Tipo de comunicación preferida:</label>
      <select
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="">Ninguna</option>
        <option value="email">Correo</option>
        <option value="sms">SMS</option>
        <option value="notificaciones">Notificaciones</option>
      </select>
      <button onClick={updatePreference} className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default Communications;
