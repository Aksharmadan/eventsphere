// src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '../api';

type User = { id: string; name: string; email: string; role: string } | null;

export const AuthContext = createContext<{
  user: User;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('es_token'));
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('es_user') || 'null'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(undefined);
    }
  }, [token]);

  const login = (t: string, u: User) => {
    setToken(t);
    setUser(u);
    localStorage.setItem('es_token', t);
    localStorage.setItem('es_user', JSON.stringify(u));
    setAuthToken(t);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('es_token');
    localStorage.removeItem('es_user');
    setAuthToken(undefined);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
