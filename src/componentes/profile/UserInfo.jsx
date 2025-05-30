import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const UserInfo = () => {
  const [userData, setUserData] = useState({ username: '', id: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('user_profiles')
        .select('id, username')
        .eq('id', user.id)
        .single();
      setUserData(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Nombre de usuario</h2>
      <p>{userData.username}</p>
      <h3 className="text-lg font-semibold mt-4">Datos de identificación</h3>
      <p>No disponible por ahora.</p>
    </div>
  );
};

export default UserInfo;
