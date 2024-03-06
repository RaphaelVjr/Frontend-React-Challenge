import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userCredentials) => {

    setUser(userCredentials);
  };

  const logout = () => {

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


export const useAuth = () => {
  return useContext(AuthContext);
};