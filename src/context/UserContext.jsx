// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener usuario actual al iniciar
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Escuchar cambios de sesión (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
