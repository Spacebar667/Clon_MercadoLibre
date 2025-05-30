import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const AccountData = () => {
  const [data, setData] = useState({ email: '', phone: '', username: '' });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('username, email, phone')
        .eq('id', user.id)
        .single();
      setData(profile);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-2">
      <div><strong>Correo:</strong> {data.email}</div>
      <div><strong>Teléfono:</strong> {data.phone || 'No registrado'}</div>
      <div><strong>Nombre:</strong> {data.username}</div>
    </div>
  );
};

export default AccountData;
