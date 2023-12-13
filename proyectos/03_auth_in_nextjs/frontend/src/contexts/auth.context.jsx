'use client'

import Cookie from 'js-cookie'
import React, { createContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear un componente proveedor del contexto
const AuthContextProvider = ({ children }) => {
  const login = (authToken) => {
    Cookie.set('AUTH_TOKEN', authToken)
  }
  const logout = () => {
    Cookie.remove('AUTH_TOKEN')
  }
  const getToken = () => {
    return Cookie.get('AUTH_TOKEN')
  }
  return (
    <AuthContext.Provider value={{
      login,
      logout,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
