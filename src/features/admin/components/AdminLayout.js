import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BarChartFill, PeopleFill, BoxSeam, CartFill, FileImageFill, Coin,
  BoxSeamFill, ListCheck
} from 'react-bootstrap-icons';
import DashboardPage from '../dashboard/DashboardPage';
import OrdersPage from '../orders/OrdersPage';
import ProductsPage from '../products/ProductsPage';
import CustomersPage from '../customers/CustomersPage';
import PaymentMethodsPage from '../payment-methods/PaymentMethodsPage';
import ImagesPage from '../images/ImagesPage';
import FragrancePage from '../fragrance/FragrancePage';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Tổng quan', icon: <BarChartFill /> },
  { id: 'orders', label: 'Đơn hàng', icon: <CartFill /> },
  { id: 'products', label: 'Sản phẩm', icon: <BoxSeam /> },
  { id: 'customers', label: 'Khách hàng', icon: <PeopleFill /> },
  { id: 'paymentMethods', label: 'Phương thức thanh toán', icon: <Coin /> },
  { id: 'images', label: 'Hình ảnh', icon: <FileImageFill /> },
  { id: 'fragrance', label: 'Hương nước hoa', icon: <BoxSeamFill /> },
];
const PAGE_COMPONENTS = {
  dashboard: DashboardPage,
  orders: OrdersPage,
  products: ProductsPage,
  customers: CustomersPage,
  paymentMethods: PaymentMethodsPage,
  images: ImagesPage,
  fragrance: FragrancePage,
};

export default function AdminLayout() {
  const [activePage, setActivePage] = useState('dashboard');
  const ActivePage = PAGE_COMPONENTS[activePage] || DashboardPage;
  return <Layout>
    <Sidebar>
      <Brand>⚜ SynPe Admin</Brand>
      <Nav>{NAV_ITEMS.map(item => <NavButton key={item.id} type="button" $active={activePage === item.id} onClick={() => setActivePage(item.id)}>
        {item.icon}<span>{item.label}</span>
      </NavButton>)}</Nav>
    </Sidebar>
    <Main><ActivePage /></Main>
  </Layout>;
}

const Layout = styled.div`display:flex;min-height:80vh;background:#f5f4f0;color:#1a1a1a;`;
const Sidebar = styled.aside`width:240px;flex-shrink:0;background:#0b0d13;padding:24px 0;color:#fff;@media(max-width:760px){width:64px;}`;
const Brand = styled.div`color:#d4af37;font-size:18px;font-weight:800;letter-spacing:1px;padding:0 20px 24px;border-bottom:1px solid #242630;margin-bottom:12px;white-space:nowrap;@media(max-width:760px){font-size:0;padding:0 0 24px;text-align:center;&:first-letter{font-size:22px;}}`;
const Nav = styled.nav`display:flex;flex-direction:column;gap:4px;`;
const NavButton = styled.button`display:flex;align-items:center;gap:12px;width:100%;padding:13px 20px;text-align:left;border:0;border-left:3px solid ${p=>p.$active?'#d4af37':'transparent'};background:${p=>p.$active?'rgba(212,175,55,.12)':'transparent'};color:${p=>p.$active?'#d4af37':'#aaa'};cursor:pointer;font-size:13px;white-space:nowrap;&:hover{color:#d4af37;background:rgba(212,175,55,.07);}svg{font-size:16px;flex-shrink:0;}@media(max-width:760px){justify-content:center;padding:14px 0;span{display:none;}}`;
const Main = styled.main`flex:1;min-width:0;padding:28px;@media(max-width:600px){padding:16px;}`;
