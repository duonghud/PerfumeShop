import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClockHistory, ChevronDown, ChevronUp, BoxSeam, Truck, CheckCircle, XCircle, HourglassSplit } from 'react-bootstrap-icons';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
const fmtDate = s => new Date(s).toLocaleString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });

const STATUS_MAP = {
  pending:    { label: 'Chờ xác nhận', color: '#f39c12', icon: <HourglassSplit size={14}/> },
  confirmed:  { label: 'Đã xác nhận',  color: '#3498db', icon: <CheckCircle size={14}/> },
  shipping:   { label: 'Đang giao',    color: '#9b59b6', icon: <Truck size={14}/> },
  delivered:  { label: 'Đã giao',      color: '#2ecc71', icon: <CheckCircle size={14}/> },
  cancelled:  { label: 'Đã hủy',       color: '#e74c3c', icon: <XCircle size={14}/> },
};

const PAYMENT_MAP = {
  cod:  'Tiền mặt (COD)',
  card: 'Thẻ tín dụng',
  bank: 'Chuyển khoản',
};

const OrderHistory = () => {
  const { user, openLogin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('synpe_orders') || '[]');
    if (user) {
      setOrders(all.filter(o => o.userId === user.id || o.userEmail === user.email));
    } else {
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <Wrap>
        <EmptyBox>
          <ClockHistory size={56} />
          <h2>Bạn chưa đăng nhập</h2>
          <p>Đăng nhập để xem lịch sử đặt hàng của bạn.</p>
          <button onClick={openLogin}>Đăng nhập</button>
        </EmptyBox>
      </Wrap>
    );
  }

  if (orders.length === 0) {
    return (
      <Wrap>
        <EmptyBox>
          <BoxSeam size={56} />
          <h2>Chưa có đơn hàng nào</h2>
          <p>Bạn chưa đặt hàng nào. Hãy khám phá cửa hàng!</p>
          <button onClick={() => navigate('/shop')}>Mua sắm ngay</button>
        </EmptyBox>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <PageTitle>
        <ClockHistory size={24} />
        Lịch sử đặt hàng
        <span className="count">{orders.length} đơn</span>
      </PageTitle>

      <OrderList>
        {orders.map(order => {
          const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
          const isOpen = expanded === order.id;
          return (
            <OrderCard key={order.id} className={isOpen ? 'open' : ''}>
              <OrderHeader onClick={() => setExpanded(isOpen ? null : order.id)}>
                <div className="left">
                  <span className="order-id">#{order.id}</span>
                  <span className="date">{fmtDate(order.createdAt)}</span>
                </div>
                <div className="right">
                  <StatusBadge color={st.color}>
                    {st.icon} {st.label}
                  </StatusBadge>
                  <span className="total">{fmt(order.total)}</span>
                  {isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </div>
              </OrderHeader>

              {isOpen && (
                <OrderBody>
                  <div className="section">
                    <h4>Thông tin giao hàng</h4>
                    <InfoGrid>
                      <div><span>Người nhận</span><strong>{order.userName}</strong></div>
                      <div><span>Điện thoại</span><strong>{order.phone}</strong></div>
                      <div><span>Email</span><strong>{order.userEmail}</strong></div>
                      <div><span>Địa chỉ</span><strong>{order.address}</strong></div>
                      <div><span>Vận chuyển</span><strong>{order.shipping?.label}</strong></div>
                      <div><span>Thanh toán</span><strong>{PAYMENT_MAP[order.payment] || order.payment}</strong></div>
                    </InfoGrid>
                    {order.note && <Note>Ghi chú: {order.note}</Note>}
                  </div>

                  <div className="section">
                    <h4>Sản phẩm</h4>
                    <ItemList>
                      {order.items.map((item, idx) => (
                        <Item key={idx}>
                          <img src={item.img} alt={item.name} />
                          <div className="info">
                            <span className="name">{item.name}</span>
                            <span className="brand">{item.brand}</span>
                          </div>
                          <div className="price-info">
                            <span className="qty">x{item.qty}</span>
                            <span className="price">{fmt(item.price * item.qty)}</span>
                          </div>
                        </Item>
                      ))}
                    </ItemList>
                  </div>

                  <Summary>
                    <div><span>Tạm tính</span><span>{fmt(order.subtotal)}</span></div>
                    <div><span>Phí vận chuyển</span><span>{fmt(order.shippingFee)}</span></div>
                    <div className="total-row"><span>Tổng cộng</span><strong>{fmt(order.total)}</strong></div>
                  </Summary>
                </OrderBody>
              )}
            </OrderCard>
          );
        })}
      </OrderList>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 70vh; padding: 40px 5%; max-width: 860px; margin: 0 auto;
  color: #fff;
  body:not(.dark) & { color: #1a1a1a; }
`;

const PageTitle = styled.h1`
  display: flex; align-items: center; gap: 12px;
  font-size: 26px; font-weight: 800; margin-bottom: 28px; color: #D4AF37;
  .count { font-size: 14px; background: rgba(212,175,55,0.15); color: #D4AF37;
    padding: 3px 10px; border-radius: 20px; font-weight: 600; margin-left: 4px; }
`;

const EmptyBox = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  padding: 80px 20px; text-align: center; color: #888;
  svg { color: #D4AF37; opacity: 0.7; }
  h2 { font-size: 22px; color: #fff; margin: 0; body:not(.dark) & { color: #222; } }
  p { margin: 0; font-size: 15px; }
  button { margin-top: 8px; background: #D4AF37; color: #000; border: none;
    padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: 0.2s; &:hover { background: #c9a227; } }
`;

const OrderList = styled.div`
  display: flex; flex-direction: column; gap: 14px;
`;

const OrderCard = styled.div`
  background: #0f1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
  overflow: hidden; transition: border-color 0.2s;
  &.open { border-color: rgba(212,175,55,0.3); }
  body:not(.dark) & { background: #fff; border-color: #eee;
    &.open { border-color: #D4AF37; } }
`;

const OrderHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; cursor: pointer; gap: 12px;
  &:hover { background: rgba(255,255,255,0.03); }
  body:not(.dark) &:hover { background: #fafaf8; }
  .left { display: flex; flex-direction: column; gap: 4px; }
  .order-id { font-weight: 700; font-size: 15px; color: #D4AF37; }
  .date { font-size: 12px; color: #888; }
  .right { display: flex; align-items: center; gap: 14px; flex-shrink: 0;
    svg:last-child { color: #888; } }
  .total { font-weight: 700; font-size: 16px; }
`;

const StatusBadge = styled.span`
  display: flex; align-items: center; gap: 5px;
  color: ${p => p.color}; background: ${p => p.color}18;
  padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
  white-space: nowrap;
`;

const OrderBody = styled.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 20px; display: flex; flex-direction: column; gap: 20px;
  body:not(.dark) & { border-color: #f0f0f0; }
  .section h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px;
    color: #888; margin: 0 0 12px; }
`;

const InfoGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  @media(max-width:600px) { grid-template-columns: 1fr; }
  > div { display: flex; flex-direction: column; gap: 2px;
    span { font-size: 12px; color: #888; }
    strong { font-size: 14px; } }
`;

const Note = styled.div`
  margin-top: 10px; font-size: 13px; color: #aaa; font-style: italic;
  padding: 8px 12px; background: rgba(255,255,255,0.04); border-radius: 8px;
  body:not(.dark) & { background: #f8f7f2; color: #666; }
`;

const ItemList = styled.div`
  display: flex; flex-direction: column; gap: 10px;
`;

const Item = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 10px; background: rgba(255,255,255,0.04); border-radius: 10px;
  body:not(.dark) & { background: #fafaf8; }
  img { width: 50px; height: 58px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  .info { flex: 1; min-width: 0;
    .name { display: block; font-size: 14px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .brand { font-size: 12px; color: #888; } }
  .price-info { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;
    .qty { font-size: 12px; color: #888; }
    .price { font-size: 14px; font-weight: 700; color: #D4AF37; } }
`;

const Summary = styled.div`
  border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;
  display: flex; flex-direction: column; gap: 8px;
  body:not(.dark) & { border-color: #f0f0f0; }
  > div { display: flex; justify-content: space-between; font-size: 14px; color: #aaa;
    body:not(.dark) & { color: #666; } }
  .total-row { color: #fff; font-size: 16px; border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 10px; margin-top: 4px;
    body:not(.dark) & { color: #111; border-color: #eee; }
    strong { color: #D4AF37; font-size: 18px; } }
`;

export default OrderHistory;
