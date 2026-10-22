import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  // Khôi phục user từ localStorage khi tải lại trang
  useEffect(() => {
    const saved = localStorage.getItem('synpe_user');
    if (saved) { 
      try { 
        setUser(JSON.parse(saved)); 
      } catch (e) {
        console.error("Lỗi parse user từ localStorage", e);
      } 
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Gọi api chuẩn /auth/login
      const result = await loginApi(email, password);
      
      const token = result.token;
      if (!token) {
        return { ok: false, error: 'Không nhận được mã token từ hệ thống!' };
      }

      // Tạo object user lưu trữ phiên đăng nhập
      const safeUser = {
        email: email,
        name: email.split('@')[0],
        avatar: email.charAt(0).toUpperCase(),
      };

      setUser(safeUser);
      
      // Lưu vào localStorage
      localStorage.setItem('synpe_user', JSON.stringify(safeUser));
      localStorage.setItem('token', token);
      localStorage.setItem('synpe_token', token);

      setAuthModal({ open: false, mode: 'login' });
      return { ok: true };
    } catch (error) {
      const errorMsg = error.response?.data || error.message || 'Đăng nhập thất bại';
      return { ok: { false: true }, error: typeof errorMsg === 'string' ? errorMsg : 'Tài khoản hoặc mật khẩu không chính xác' };
    }
  };

  const register = async (name, email, password) => {
    try {
      await registerApi(name, email, password);
      return await login(email, password);
    } catch (error) {
      const errorMsg = error.response?.data || error.message || 'Đăng ký thất bại';
      return { ok: false, error: typeof errorMsg === 'string' ? errorMsg : 'Đăng ký thất bại' };
    }
  };

  const logout = () => { 
    setUser(null); 
    localStorage.removeItem('synpe_user'); 
    localStorage.removeItem('synpe_token'); 
    localStorage.removeItem('token'); 
  };

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