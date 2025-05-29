// src/componentes/profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          window.location.href = '/login';
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1);

        console.log({ data, error });


        if (error && error.code !== 'PGRST116') throw error;
        
        setProfile({
          ...data,
          id: user.id,
          email: user.email
        });
      } catch (error) {
        console.error('Error al cargar perfil:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = (updatedData) => {
    setProfile(updatedData);
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (!profile) return <div>No se pudo cargar el perfil</div>;

  return <Outlet context={{ profile, updateProfile }} />;
};

export default Profile;