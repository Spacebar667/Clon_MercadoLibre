// src/componentes/admin/Administrador.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfilYUsuarios = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data: perfilData, error: perfilError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (perfilError) {
        console.error('Error cargando perfil:', perfilError);
        return;
      }

      setPerfil(perfilData);

      if (perfilData.rol === 'admin') {
        const { data: allUsers, error: usuariosError } = await supabase
          .from('profiles')
          .select('*');

        if (usuariosError) {
          console.error('Error cargando usuarios:', usuariosError);
        } else {
          setUsuarios(allUsers);
        }
      } else {
        console.warn('Acceso denegado: no eres administrador');
      }

      setLoading(false);
    };

    cargarPerfilYUsuarios();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!perfil || perfil.rol !== 'admin') return <div>Acceso denegado</div>;

  return (
    <div>
      <h1>Panel de Administración</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administrador;
