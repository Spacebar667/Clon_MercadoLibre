// src/componentes/profile/ProfileGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Settings, CreditCard, MapPin, 
  Shield, Lock, MessageSquare 
} from 'lucide-react';

const ProfileGrid = () => {
  const gridOptions = [
    {
      id: 'user-info',
      title: 'Tu Información',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'account-data',
      title: 'Datos de tu Cuenta',
      icon: Settings,
      color: 'bg-gray-500'
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      id: 'cards',
      title: 'Tarjetas',
      icon: CreditCard,
      color: 'bg-green-500'
    },
    {
      id: 'addresses',
      title: 'Direcciones',
      icon: MapPin,
      color: 'bg-purple-500'
    },
    {
      id: 'privacy',
      title: 'Privacidad',
      icon: Lock,
      color: 'bg-yellow-500'
    },
    {
      id: 'communications',
      title: 'Comunicaciones',
      icon: MessageSquare,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Mi Perfil</h1>
        <p className="profile-subtitle">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="profile-grid">
        {gridOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Link
              key={option.id}
              to={`/profile/${option.id}`}
              className="grid-item"
            >
              <div className={`icon-container ${option.color}`}>
                <IconComponent size={24} className="icon" />
              </div>
              <h3 className="grid-item-title">
                {option.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileGrid;