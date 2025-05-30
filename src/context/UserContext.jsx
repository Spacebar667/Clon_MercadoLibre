// src/context/UserContext.jsx - Versión con debugging detallado
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Función simple para obtener el rol (tu versión original + logs)
  const getUserRole = async (userId) => {

    
    try {

      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single();
      

      
      if (!error && data) {
        const cleanRole = data.role?.trim(); // Limpiar espacios y saltos de línea

        setRole(cleanRole);
      } else {

        setRole(null);
      }
    } catch (error) {

      setRole(null);
    }
  };

  useEffect(() => {

    
    // Obtener usuario actual al iniciar
    supabase.auth.getUser().then(({ data }) => {
      const currentUser = data.user ?? null;

      
      setUser(currentUser);
      if (currentUser) {
        getUserRole(currentUser.id);
      } else {

      }
      setLoadingUser(false);

    });

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {

      
      const sessionUser = session?.user ?? null;

      
      setUser(sessionUser);
      if (sessionUser) {
        getUserRole(sessionUser.id);
      } else {
        setRole(null);

      }
      setLoadingUser(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {

    await supabase.auth.signOut();
    setUser(null);
    setRole(null);

  };



  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      role, 
      loadingUser, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
}