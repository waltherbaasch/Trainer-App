import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    setAuthState({
      token,
      isAuthenticated: true,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
