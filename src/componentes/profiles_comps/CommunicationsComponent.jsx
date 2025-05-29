import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const CommunicationsComponent = () => {
  const { profile, updateProfile } = useOutletContext();
  const [preference, setPreference] = useState(profile?.communication_preference || 'email');

  const handlePreferenceChange = async (newPreference) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ communication_preference: newPreference })
        .eq('id', profile.id);

      if (error) throw error;
      
      setPreference(newPreference);
      updateProfile({
        ...profile,
        communication_preference: newPreference
      });
    } catch (error) {
      console.error('Error al actualizar preferencia:', error.message);
    }
  };

  return (
    <div className="component-container">
      <Link to="/profile" className="back-button">← Volver</Link>
      <h2 className="section-title">Comunicaciones</h2>
      <div className="communications-container">
        <p className="communications-description">
          Elige cómo prefieres recibir nuestras comunicaciones y notificaciones importantes.
        </p>
        
        <div className="communication-options">
          {['email', 'push', 'sms'].map((option) => (
            <div 
              key={option}
              className={`communication-option ${preference === option ? 'selected' : ''}`}
              onClick={() => handlePreferenceChange(option)}
            >
              <div className="option-icon">
                {option === 'email' ? '📧' : option === 'push' ? '🔔' : '📱'}
              </div>
              <div className="option-content">
                <h3>
                  {option === 'email' ? 'Email' : 
                   option === 'push' ? 'Push' : 'SMS'}
                </h3>
                <p>
                  {option === 'email' ? 'Recibe notificaciones por correo electrónico' : 
                   option === 'push' ? 'Recibe notificaciones push en tu dispositivo' : 
                   'Recibe notificaciones por mensaje de texto'}
                </p>
              </div>
              <div className="option-radio">
                <input 
                  type="radio" 
                  checked={preference === option}
                  onChange={() => handlePreferenceChange(option)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationsComponent;