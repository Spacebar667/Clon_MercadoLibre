// src/components/profile/Profiles.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Settings, CreditCard, MapPin, 
  Shield, Lock, MessageSquare 
} from 'lucide-react';
import './Profile.css'; // Archivo CSS para estilos personalizados

const Profile = () => {
  const gridOptions = [
    {
      id: 'user-info',
      title: 'Tu Información',
      icon: User,
      color: 'bg-blue-500',
      description: 'Administra tu información personal y datos de contacto'
    },
    {
      id: 'account-data',
      title: 'Datos de tu Cuenta',
      icon: Settings,
      color: 'bg-gray-500',
      description: 'Configura los detalles principales de tu cuenta'
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Cambia tu contraseña y configura la autenticación'
    },
    {
      id: 'cards',
      title: 'Tarjetas',
      icon: CreditCard,
      color: 'bg-green-500',
      description: 'Gestiona tus métodos de pago guardados'
    },
    {
      id: 'addresses',
      title: 'Direcciones',
      icon: MapPin,
      color: 'bg-purple-500',
      description: 'Administra tus direcciones de envío y facturación'
    },
    {
      id: 'privacy',
      title: 'Privacidad',
      icon: Lock,
      color: 'bg-yellow-500',
      description: 'Controla tu configuración de privacidad y datos'
    },
    {
      id: 'communications',
      title: 'Comunicaciones',
      icon: MessageSquare,
      color: 'bg-indigo-500',
      description: 'Administra tus preferencias de notificaciones'
    }
  ];

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <h1 className="profiles-title">Mi Perfil</h1>
        <p className="profiles-subtitle">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="profiles-grid">
        {gridOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Link
              key={option.id}
              to={`/profile/${option.id}`}
              className="profiles-grid-item"
            >
              <div className={`profiles-icon-container ${option.color}`}>
                <IconComponent size={24} className="profiles-icon" />
              </div>
              <div className="profiles-item-content">
                <h3 className="profiles-item-title">{option.title}</h3>
                <p className="profiles-item-description">{option.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;