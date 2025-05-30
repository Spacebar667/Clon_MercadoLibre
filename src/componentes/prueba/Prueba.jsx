import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate de que la ruta sea correcta


const Prueba = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error al obtener el usuario:', userError.message);
        setUserId(null);
        setRole('');
      } else if (user) {
        setUserId(user.id);

        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id) // Cambia a 'user_id' si tu campo se llama así
          .maybeSingle();

        if (profileError) {
          console.error('Error al obtener el rol:', profileError.message);
          setRole('Error');
        } else if (!profile) {
          setRole('Sin rol');
        } else {
          setRole(profile.role);
        }
      }

      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Datos del Usuario</h2>
      <p><strong>ID:</strong> {userId}</p>
      <p><strong>Rol:</strong> {role}</p>
    </div>
  );
};

export default Prueba;
