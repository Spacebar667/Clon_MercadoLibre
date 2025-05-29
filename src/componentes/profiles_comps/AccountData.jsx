import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AccountData = () => {
  const { profile, updateProfile } = useOutletContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phone: profile?.phone || ''
  });

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ phone: formData.phone })
        .eq('id', profile.id);

      if (error) throw error;
      
      updateProfile({
        ...profile,
        phone: formData.phone
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar teléfono:', error.message);
    }
  };

  return (
    <div className="component-container">
      <Link to="/profile" className="back-button">← Volver</Link>
      <h2 className="section-title">Datos de tu Cuenta</h2>
      <div className="account-data-container">
        <div className="data-item">
          <label className="data-label">Email</label>
          <div className="data-value">
            <span>{profile?.email || 'No especificado'}</span>
            <span className="edit-disabled">(Contacta al soporte para cambiar)</span>
          </div>
        </div>
        <div className="data-item">
          <label className="data-label">Teléfono</label>
          {editMode ? (
            <div className="data-value">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <div className="form-actions">
                <button onClick={() => setEditMode(false)}>Cancelar</button>
                <button onClick={handleSave}>Guardar</button>
              </div>
            </div>
          ) : (
            <div className="data-value">
              <span>{profile?.phone || 'No especificado'}</span>
              <button onClick={() => setEditMode(true)} className="edit-link">
                Cambiar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountData;