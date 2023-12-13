'use client'

import { createContext } from 'react'
import Cookie from 'js-cookie'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const login = (auth_token) => {
    Cookie.set('AUTH_TOKEN', auth_token)
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
    }
    }>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthContextProvider
}