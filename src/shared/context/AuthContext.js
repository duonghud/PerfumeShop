import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  useEffect(() => {
    const saved = localStorage.getItem('synpe_user');
    if (saved) { try { setUser(JSON.parse(saved)); } catch {} }
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginApi(email, password);
      const rawUser = result.user || {};
      const safe = {
        ...rawUser,
        id: rawUser.id ?? rawUser.customerId ?? rawUser.customerID,
        name: rawUser.name || rawUser.fullName || rawUser.fullname || email,
        email: rawUser.email || email,
        avatar: (rawUser.name || rawUser.fullName || email).charAt(0).toUpperCase(),
      };
      setUser(safe);
      localStorage.setItem('synpe_user', JSON.stringify(safe));
      setAuthModal({ open: false, mode: 'login' });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || 'Đăng nhập thất bại' };
    }
  };

  const register = async (name, email, password) => {
    try {
      await registerApi(name, email, password);
      return await login(email, password);
    } catch (error) {
      return { ok: false, error: error.message || 'Đăng ký thất bại' };
    }
  };

  const logout = () => { setUser(null); localStorage.removeItem('synpe_user'); localStorage.removeItem('synpe_token'); };
  const openLogin = () => setAuthModal({ open: true, mode: 'login' });
  const openRegister = () => setAuthModal({ open: true, mode: 'register' });
  const closeAuth = () => setAuthModal(v => ({ ...v, open: false }));

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authModal, openLogin, openRegister, closeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
