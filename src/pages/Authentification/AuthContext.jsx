import React, { useState } from 'react'

const AuthContext = React.createContext({
  token: null,
  role: null,
  prenom:null,
  setAuth: () => {},
})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [prenom, setPrenom] = useState(null)

  const setAuth = (data) => {
    setToken(data.token)
    setRole(data.role)
    setPrenom(data.prenom)
    /*localStorage.setItem('role',role)
    localStorage.setItem('token',token)
    localStorage.setItem('prenom',prenom)*/
    
  }

  const contextValue = {
    token,
    role,
    prenom,
    setAuth,
  }
  const logout = () => {
    setToken('')
    setRole('')
    setPrenom('')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('prenom')
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext