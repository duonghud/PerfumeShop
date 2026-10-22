import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();
  
  // Kiểm tra xem đã có user hoặc token trong localStorage chưa
  const token = localStorage.getItem('token') || localStorage.getItem('synpe_token');

  if (!user && !token) {
    // Chưa đăng nhập -> Chuyển về trang login admin
    return <Navigate to="/admin/login" replace />;
  }

  // Đã đăng nhập -> Cho phép vào giao diện quản trị bên trong
  return <Outlet />;
}