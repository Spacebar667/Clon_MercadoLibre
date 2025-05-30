import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './AdminPanel.css';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    communication_preference: '',
    role: 'user'
  });

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si el usuario es admin
  const checkAdmin = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log('No hay usuario autenticado:', authError);
        return false;
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error al obtener perfil:', profileError);
        return false;
      }

      // Limpiar el rol de espacios y saltos de línea
      const cleanedRole = profile?.role?.trim().toLowerCase();
      return cleanedRole === 'admin';
    } catch (err) {
      console.error('Error verificando admin:', err);
      return false;
    }
  };

  // Manejar edición de usuario
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      communication_preference: user.communication_preference || '',
      role: user.role?.trim().toLowerCase() || 'user'
    });
  };

  // Guardar cambios del usuario
  const handleSave = async (userId) => {
    try {
      // Limpiar el rol antes de guardar
      const cleanedForm = {
        ...editForm,
        role: editForm.role.trim().toLowerCase()
      };

      const { error } = await supabase
        .from('user_profiles')
        .update(cleanedForm)
        .eq('id', userId);

      if (error) throw error;

      setEditingId(null);
      await fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error al actualizar el usuario');
    }
  };

  // Eliminar usuario
  const handleDelete = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      // Primero eliminar de auth
      await supabase.auth.admin.deleteUser(userId);
      
      // Luego eliminar de user_profiles
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      await fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Error al eliminar el usuario');
    }
  };

  // Inicializar componente
  useEffect(() => {
    const initialize = async () => {
      try {
        const adminStatus = await checkAdmin();
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          setError('No tienes permisos para acceder a esta sección');
          setLoading(false);
          return;
        }
        
        await fetchUsers();
      } catch (err) {
        console.error('Error inicializando:', err);
        setError('Error al cargar el panel de administración');
        setLoading(false);
      }
    };
    
    initialize();
  }, []);

  // Renderizado condicional
  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-container">
        <div className="error">No tienes permisos para acceder a esta sección</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <div className="admin-header">
        <p>Total de usuarios: {users.length}</p>
        <button onClick={fetchUsers} className="refresh-btn">
          Actualizar lista
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Preferencia</th>
              <th>Rol</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => 
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      placeholder="Nombre de usuario"
                    />
                  ) : (
                    user.username || '-'
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => 
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => 
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      placeholder="Teléfono"
                    />
                  ) : (
                    user.phone || '-'
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <select
                      value={editForm.communication_preference}
                      onChange={(e) => 
                        setEditForm({ ...editForm, communication_preference: e.target.value })
                      }
                    >
                      <option value="">Ninguna</option>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="notificaciones">Notificaciones</option>
                    </select>
                  ) : (
                    user.communication_preference || '-'
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => 
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                    >
                      <option value="user">Usuario</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  ) : (
                    user.role?.trim() || 'user'
                  )}
                </td>
                <td>
                  {new Date(user.created_at).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>
                <td className="actions">
                  {editingId === user.id ? (
                    <>
                      <button 
                        onClick={() => handleSave(user.id)}
                        className="save-btn"
                      >
                        Guardar
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="cancel-btn"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleEdit(user)}
                        className="edit-btn"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="delete-btn"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;