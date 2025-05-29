import React, { useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { User } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const UserInfo = () => {
  const { profile, updateProfile } = useOutletContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    username: profile?.username || ''
  });

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          username: formData.username
        })
        .eq('id', profile.id);

      if (error) throw error;
      
      updateProfile({
        ...profile,
        ...formData
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar:', error.message);
    }
  };

  return (
    <div className="component-container">
      <Link to="/profile" className="back-button">← Volver</Link>
      <h2 className="section-title">Tu Información</h2>
      <div className="user-info-container">
        <div className="user-avatar">
          <User size={64} className="avatar-icon" />
        </div>
        {editMode ? (
          <div className="user-details">
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button onClick={() => setEditMode(false)}>Cancelar</button>
              <button onClick={handleSave}>Guardar</button>
            </div>
          </div>
        ) : (
          <div className="user-details">
            <h3 className="user-name">{profile?.full_name || 'No especificado'}</h3>
            <p className="username">@{profile?.username || 'sin_usuario'}</p>
            <div className="user-actions">
              <button onClick={() => setEditMode(true)} className="edit-button">
                Editar información
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;