import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import { CartProvider } from './shared/context/CartContext';

// Customer Layout & Pages
import CustomerLayout from './features/customer/components/CustomerLayout';
import HomePage from './features/customer/pages/HomePage';
import About from './features/customer/pages/About';
import Checkout from './features/customer/pages/Checkout';
import OrderHistory from './features/customer/pages/OrderHistory';
import ProductDetail from './features/customer/products/ProductDetail';

// Admin Login & Layout & Pages
import LoginPage from './features/admin/pages/LoginPage';
import AdminLayout from './features/admin/components/AdminLayout';
import DashboardPage from './features/admin/dashboard/DashboardPage';
import CustomersPage from './features/admin/customers/CustomersPage';
import ProductsPage from './features/admin/products/ProductsPage';
import FragrancePage from './features/admin/fragrance/FragrancePage';
import OrdersPage from './features/admin/orders/OrdersPage';
import ImagesPage from './features/admin/images/ImagesPage';
import PaymentMethodsPage from './features/admin/payment-methods/PaymentMethodsPage';
import AdminsPage from './features/admin/admins/AdminsPage';

// Protected Route Guard
import ProtectedRoute from './shared/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ================= KHU VỰC CUSTOMER (Đã có Header & Footer) ================= */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Route>

            {/* ================= TRANG ĐĂNG NHẬP ADMIN ================= */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* ================= KHU VỰC ADMIN (BẢO VỆ BỞI AUTH) ================= */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="fragrance" element={<FragrancePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="images" element={<ImagesPage />} />
                <Route path="payment-methods" element={<PaymentMethodsPage />} />
                <Route path="admins" element={<AdminsPage />} />
              </Route>
            </Route>

            {/* Điều hướng mặc định */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;