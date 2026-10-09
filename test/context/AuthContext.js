import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  useEffect(() => {
    const saved = localStorage.getItem('synpe_user');
    if (saved) { try { setUser(JSON.parse(saved)); } catch {} }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('synpe_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'Email hoặc mật khẩu không đúng' };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem('synpe_user', JSON.stringify(safe));
    setAuthModal({ open: false, mode: 'login' });
    return { ok: true };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('synpe_users') || '[]');
    if (users.find(u => u.email === email)) return { ok: false, error: 'Email đã được sử dụng' };
    const newUser = { id: Date.now(), name, email, password, avatar: name.charAt(0).toUpperCase(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('synpe_users', JSON.stringify(users));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem('synpe_user', JSON.stringify(safe));
    setAuthModal({ open: false, mode: 'login' });
    return { ok: true };
  };

  const logout = () => { setUser(null); localStorage.removeItem('synpe_user'); };
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
