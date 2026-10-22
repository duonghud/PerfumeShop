import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';
import {
  BarChartFill, PeopleFill, BoxSeam, CartFill, FileImageFill, Coin,
  BoxSeamFill, PersonCircle, BoxArrowRight, Person, ChevronDown
} from 'react-bootstrap-icons';
import DashboardPage from '../dashboard/DashboardPage';
import OrdersPage from '../orders/OrdersPage';
import ProductsPage from '../products/ProductsPage';
import AdminsPage from '../admins/AdminsPage';
import CustomersPage from '../customers/CustomersPage';
import PaymentMethodsPage from '../payment-methods/PaymentMethodsPage';
import ImagesPage from '../images/ImagesPage';
import FragrancePage from '../fragrance/FragrancePage';
import PerfumeTypesPage from '../Type/PerfumeTypesPage';

import './AdminLayout.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Tổng quan', icon: <BarChartFill /> },
  { id: 'orders', label: 'Đơn hàng', icon: <CartFill /> },
  { id: 'products', label: 'Sản phẩm', icon: <BoxSeam /> },
  { id: 'admins', label: 'Quản trị viên', icon: <PeopleFill /> },
  { id: 'customers', label: 'Khách hàng', icon: <PeopleFill /> },
  { id: 'paymentMethods', label: 'Phương thức thanh toán', icon: <Coin /> },
  { id: 'images', label: 'Hình ảnh', icon: <FileImageFill /> },
  { id: 'fragrance', label: 'Hương nước hoa', icon: <BoxSeamFill /> },
  { id: 'type', label: 'Loại nước hoa', icon: <BoxSeamFill /> },
];

const PAGE_COMPONENTS = {
  dashboard: DashboardPage,
  orders: OrdersPage,
  products: ProductsPage,
  customers: CustomersPage,
  admins: AdminsPage,
  paymentMethods: PaymentMethodsPage,
  images: ImagesPage,
  fragrance: FragrancePage,
  type: PerfumeTypesPage,
};

export default function AdminLayout({ onProfileClick }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const ActivePage = PAGE_COMPONENTS[activePage] || DashboardPage;

  const currentUser = user || {
    name: 'Nguyễn Văn Admin',
    role: 'Super Admin',
    avatar: null
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (logout) {
      logout(); // Xóa thông tin xác thực trong context/localStorage
    }
    navigate('/admin/login', { replace: true }); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">⚜ SynPe Admin</div>
        <nav className="admin-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-btn ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-main-container">
        {/* Header góc phải */}
        <header className="admin-header">
          <h2 className="admin-header-title">Quản trị hệ thống</h2>
          
          <div className="admin-user-dropdown-container" ref={dropdownRef}>
            <button 
              type="button" 
              className="admin-user-profile-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="admin-user-avatar">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <PersonCircle />
                )}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{currentUser.name}</span>
                {/* <span className="admin-user-role">{currentUser.role}</span> */}
              </div>
              <ChevronDown className={`admin-chevron ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            {/* Menu sụp xuống */}
            {isDropdownOpen && (
              <div className="admin-dropdown-menu">
                <button 
                  type="button"
                  className="admin-dropdown-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (onProfileClick) onProfileClick();
                    else alert('Mở trang Thông tin Admin');
                  }}
                >
                  <Person /> <span>Thông tin admin</span>
                </button>
                <div className="admin-dropdown-divider"></div>
                <button 
                  type="button"
                  className="admin-dropdown-item danger"
                  onClick={handleLogout}
                >
                  <BoxArrowRight /> <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Nội dung trang */}
        <main className="admin-content">
          <ActivePage />
        </main>
      </div>
    </div>
  );
}