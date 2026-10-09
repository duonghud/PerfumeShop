import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  BarChartFill, PeopleFill, BoxSeam, CartFill, CurrencyDollar,
  PencilSquare, Trash, CheckCircle, XCircle, Truck, HourglassSplit,
  Search, ChevronDown, ArrowUp, ArrowDown, Plus, Eye,
  BoxSeamFill,
  FileImageFill,
  Coin
} from 'react-bootstrap-icons';
import products from '../data/products';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
const fmtDate = s => new Date(s).toLocaleString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });

const STATUS_MAP = {
  pending:   { label: 'Chờ xác nhận', color: '#f39c12' },
  confirmed: { label: 'Đã xác nhận',  color: '#3498db' },
  shipping:  { label: 'Đang giao',    color: '#9b59b6' },
  delivered: { label: 'Đã giao',      color: '#2ecc71' },
  cancelled: { label: 'Đã hủy',       color: '#e74c3c' },
};
const STATUS_LIST = Object.entries(STATUS_MAP).map(([k,v]) => ({ value: k, ...v }));

const TABS = [
  { id: 'dashboard', label: 'Tổng quan',    icon: <BarChartFill size={16}/> },
  { id: 'orders',    label: 'Đơn hàng',     icon: <CartFill size={16}/> },
  { id: 'products',  label: 'Sản phẩm',     icon: <BoxSeam size={16}/> },
  { id: 'customers', label: 'Khách hàng',   icon: <PeopleFill size={16}/> },
  { id: 'paymentMethod', label: 'Phương thức thanh toán',   icon: <Coin size={16}/> },
  { id: 'images', label: 'Hình ảnh',   icon: <FileImageFill size={16}/> },
  { id: 'fragrance', label: 'Hương nước hoa',   icon: <BoxSeamFill size={16}/> },
];



// ─── Dashboard Card ──────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color }) => (
  <StatCardWrap color={color}>
    <div className="icon">{icon}</div>
    <div className="content">
      <span className="label">{label}</span>
      <strong className="value">{value}</strong>
      {sub && <span className="sub">{sub}</span>}
    </div>
  </StatCardWrap>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const AdminPage = () => {
  const [tab, setTab] = useState('dashboard');

  

  return (
    <AdminWrap>
      <Sidebar>
        <div className="brand">⚜ Admin</div>
        {TABS.map(t => (
          <SidebarItem key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
            {t.icon} {t.label}
          </SidebarItem>
        ))}
      </Sidebar>

      <Content>

        
      </Content>
    </AdminWrap>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────
const AdminWrap = styled.div`
  display: flex; min-height: 80vh;
  body:not(.dark) & { background: #f5f4f0; }
`;

const Sidebar = styled.aside`
  width: 220px; flex-shrink: 0; background: #0B0D13;
  padding: 28px 0; display: flex; flex-direction: column;
  .brand { color: #D4AF37; font-size: 20px; font-weight: 800;
    letter-spacing: 2px; padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 12px; }
  @media(max-width:700px) { width: 60px;
    .brand { font-size: 16px; padding: 0 12px 20px; }
  }
`;

const SidebarItem = styled.button`
  width: 100%; background: ${p => p.active ? 'rgba(212,175,55,0.12)' : 'transparent'};
  border: none; border-left: 3px solid ${p => p.active ? '#D4AF37' : 'transparent'};
  color: ${p => p.active ? '#D4AF37' : '#888'}; padding: 13px 24px;
  font-size: 14px; font-weight: ${p => p.active ? 700 : 400};
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
  &:hover { color: #D4AF37; background: rgba(212,175,55,0.06); }
  @media(max-width:700px) { padding: 13px; justify-content: center; span { display:none; } }
`;

const Content = styled.main`
  flex: 1; padding: 32px; min-width: 0;
  color: #fff;
  body:not(.dark) & { color: #1a1a1a; }
  @media(max-width:700px) { padding: 16px; }
`;

const Section = styled.div``;

const SectionTitle = styled.h2`
  font-size: 22px; font-weight: 800; margin: 0 0 24px;
  display: flex; align-items: center; gap: 10px;
  span { font-size: 13px; background: rgba(212,175,55,0.15); color: #D4AF37;
    padding: 3px 10px; border-radius: 20px; font-weight: 600; }
`;

const StatsGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;
  @media(max-width:900px) { grid-template-columns: repeat(2, 1fr); }
  @media(max-width:500px) { grid-template-columns: 1fr 1fr; }
`;

const StatCardWrap = styled.div`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px; padding: 20px; display: flex; align-items: center; gap: 14px;
  body:not(.dark) & { background: #fff; border-color: #eee; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .icon { width: 46px; height: 46px; border-radius: 12px;
    background: ${p => p.color}18; color: ${p => p.color};
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .content { min-width: 0; }
  .label { font-size: 12px; color: #888; display: block; }
  .value { font-size: 20px; font-weight: 800; display: block; }
  .sub { font-size: 11px; color: #888; }
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  @media(max-width:800px) { grid-template-columns: 1fr; }
`;

const RecentOrders = styled.div`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px;
  body:not(.dark) & { background: #fff; border-color: #eee; }
  h3 { margin: 0 0 16px; font-size: 15px; }
`;

const MiniOrder = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  body:not(.dark) & { border-color: #f0f0f0; }
  &:last-child { border-bottom: none; }
  > div { display: flex; flex-direction: column; gap: 3px; }
  strong { font-size: 13px; }
  span { font-size: 12px; color: #888; }
  > div:last-child { align-items: flex-end; }
`;

const StatusBreakdown = styled.div`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px;
  body:not(.dark) & { background: #fff; border-color: #eee; }
  h3 { margin: 0 0 16px; font-size: 15px; }
`;

const BreakRow = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 13px;
  > span:first-child { width: 110px; flex-shrink: 0; }
  > span:last-child { width: 24px; text-align: right; color: #888; }
`;

const BreakBar = styled.div`
  flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;
  body:not(.dark) & { background: #f0f0f0; }
  > div { height: 100%; border-radius: 3px; transition: width 0.6s; min-width: 4px; }
`;

const StatusDot = styled.span`
  font-size: 11px; color: ${p => p.color}; background: ${p => p.color}18;
  padding: 2px 8px; border-radius: 10px; white-space: nowrap;
`;

const Toolbar = styled.div`
  display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;
`;

const SearchBar = styled.div`
  display: flex; align-items: center; gap: 8px;
  background: #0f1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 0 12px; flex: 1; max-width: 320px;
  body:not(.dark) & { background: #fff; border-color: #ddd; }
  svg { color: #888; flex-shrink: 0; }
  input { background: transparent; border: none; outline: none; color: inherit;
    font-size: 13px; height: 36px; width: 100%;
    &::placeholder { color: #888; } }
`;

const StatusSelect = styled.select`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.1); color: inherit;
  border-radius: 8px; padding: 0 12px; height: 38px; font-size: 13px; cursor: pointer;
  body:not(.dark) & { background: #fff; border-color: #ddd; color: #111; }
`;

const StatusSelect2 = styled.select`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.15); color: inherit;
  border-radius: 8px; padding: 8px 12px; font-size: 14px; cursor: pointer; width: 100%;
  body:not(.dark) & { background: #f8f7f2; border-color: #ddd; color: #111; }
`;

const OrderTable = styled.table`
  width: 100%; border-collapse: collapse; font-size: 14px;
  th { text-align: left; padding: 10px 12px; color: #888; font-size: 12px;
    text-transform: uppercase; letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    body:not(.dark) & { border-color: #eee; } }
  td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
    body:not(.dark) & { border-color: #f0f0f0; }
    vertical-align: middle; }
  tr:hover td { background: rgba(255,255,255,0.02);
    body:not(.dark) & { background: #fafaf8; } }
  .order-id { color: #D4AF37; font-weight: 700; }
  .customer-cell { display: flex; align-items: center; gap: 10px;
    > div { display: flex; flex-direction: column; gap: 2px; }
    strong { font-size: 13px; }
    span { font-size: 12px; color: #888; } }
  .date { font-size: 12px; color: #aaa; }
  .cat-tag { background: rgba(212,175,55,0.12); color: #D4AF37;
    padding: 2px 8px; border-radius: 10px; font-size: 12px; }
  .order-count { font-weight: 600; }
  .prod-name { font-weight: 600; font-size: 13px; }
`;

const ProductTable = styled(OrderTable)``;

const StatusBadge2 = styled.span`
  color: ${p => p.color}; background: ${p => p.color}18;
  padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
  white-space: nowrap;
`;

const ActionBtns = styled.div`
  display: flex; align-items: center; gap: 6px;
  button { width: 30px; height: 30px; border-radius: 7px; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: 0.2s; }
  .view { background: rgba(52,152,219,0.15); color: #3498db;
    &:hover { background: rgba(52,152,219,0.3); } }
  .del { background: rgba(231,76,60,0.15); color: #e74c3c;
    &:hover { background: rgba(231,76,60,0.3); } }
  .status-sel { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    color: inherit; border-radius: 7px; padding: 4px 6px; font-size: 12px; cursor: pointer;
    body:not(.dark) & { background: #f5f5f5; border-color: #ddd; color: #111; } }
`;

const Avatar = styled.div`
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg,#D4AF37,#c9a227); color: #000;
  font-weight: 800; font-size: 15px;
  display: flex; align-items: center; justify-content: center;
`;

const Modal = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 9999;
  display: flex; align-items: center; justify-content: center; padding: 20px;
`;

const ModalBox = styled.div`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px; width: 100%; max-width: 520px; max-height: 85vh;
  overflow: hidden; display: flex; flex-direction: column;
  body:not(.dark) & { background: #fff; border-color: #eee; }
`;

const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.08);
  body:not(.dark) & { border-color: #eee; }
  h3 { margin: 0; font-size: 16px; }
  button { background: transparent; border: none; color: #888; font-size: 18px;
    cursor: pointer; &:hover { color: #fff; } }
`;

const ModalBody = styled.div`
  padding: 20px 22px; overflow-y: auto; flex: 1;
`;

const InfoGrid2 = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;
  > div { display: flex; flex-direction: column; gap: 3px;
    span { font-size: 12px; color: #888; }
    strong { font-size: 14px; } }
`;

const Note2 = styled.div`
  font-size: 13px; color: #aaa; font-style: italic;
  padding: 8px 12px; background: rgba(255,255,255,0.04); border-radius: 8px;
  margin-bottom: 16px;
  body:not(.dark) & { background: #f8f7f2; color: #666; }
`;

const MiniItem = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
  img { width: 42px; height: 48px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
  > div { display: flex; flex-direction: column; gap: 2px;
    strong { font-size: 13px; }
    span { font-size: 12px; color: #888; } }
`;

const SummaryRow = styled.div`
  display: flex; justify-content: space-between; padding: 6px 0;
  font-size: 14px; color: #aaa; border-top: 1px solid rgba(255,255,255,0.05);
  body:not(.dark) & { color: #666; border-color: #f0f0f0; }
  &.total { font-size: 16px; color: #fff; body:not(.dark) & { color: #111; } }
`;

const EditField = styled.div`
  margin-bottom: 14px;
  label { display: block; font-size: 12px; color: #888; margin-bottom: 5px; }
  input { width: 100%; background: #1a1d24; border: 1px solid rgba(255,255,255,0.1);
    color: #fff; border-radius: 8px; padding: 9px 12px; font-size: 14px; outline: none;
    box-sizing: border-box; transition: 0.2s;
    &:focus { border-color: #D4AF37; }
    body:not(.dark) & { background: #f8f7f2; color: #111; border-color: #ddd; } }
`;

const SaveBtn = styled.button`
  width: 100%; background: #D4AF37; color: #000; border: none;
  padding: 12px; border-radius: 10px; font-size: 15px; font-weight: 700;
  cursor: pointer; margin-top: 4px; transition: 0.2s;
  &:hover { background: #c9a227; }
`;

export default AdminPage;
