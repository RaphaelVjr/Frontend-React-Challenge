import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userCredentials) => {
    // Perform login and set user
    setUser(userCredentials);
  };

  const logout = () => {
    // Perform logout and unset user
    setUser(null);
  };

  const isRottenUser = () => {
    return user?.email.endsWith('@rotten');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isRottenUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};