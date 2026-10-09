import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useCart } from '../../../shared/context/CartContext';
import { useAuth } from '../../../shared/context/AuthContext';
import { CheckCircleFill, CreditCard2Front, Cash, Building, Truck, Shield, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { createOrderApi } from '../../../shared/api/api';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Giao hàng tiêu chuẩn', desc: '3–5 ngày làm việc', price: 30000 },
  { id: 'express', label: 'Giao hàng nhanh', desc: '1–2 ngày làm việc', price: 60000 },
  { id: 'same_day', label: 'Giao hàng trong ngày', desc: 'Nội thành HN & HCM', price: 100000 },
];

const PAYMENT_METHODS = [
  { id: 'cod', icon: <Cash size={20} />, label: 'Tiền mặt khi nhận hàng (COD)' },
  { id: 'card', icon: <CreditCard2Front size={20} />, label: 'Thẻ tín dụng / Ghi nợ' },
  { id: 'bank', icon: <Building size={20} />, label: 'Chuyển khoản ngân hàng' },
];

const Checkout = () => {
  const { items, totalPrice, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=info, 2=shipping, 3=payment, 4=done
  const [info, setInfo] = useState({
    name: user?.name || '', email: user?.email || '',
    phone: '', address: '', city: '', note: '',
  });
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && step !== 4) {
    return (
      <EmptyWrap>
        <p>🛒 Giỏ hàng của bạn đang trống</p>
        <button onClick={() => navigate('/shop')}>Tiếp tục mua sắm</button>
      </EmptyWrap>
    );
  }

  const shippingFee = SHIPPING_OPTIONS.find(s => s.id === shipping)?.price || 0;
  const grandTotal = totalPrice + shippingFee;

  const validate = () => {
    const e = {};
    if (!info.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!info.email.trim()) e.email = 'Vui lòng nhập email';
    if (!/^\S+@\S+\.\S+$/.test(info.email)) e.email = 'Email không hợp lệ';
    if (!info.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    if (!/^(0|\+84)[0-9]{9}$/.test(info.phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại không hợp lệ';
    if (!info.address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    if (!info.city.trim()) e.city = 'Vui lòng nhập tỉnh/thành phố';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validate()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrder = async () => {
    setLoading(true);
    try {
      const shippingOption = SHIPPING_OPTIONS.find(s => s.id === shipping);
      const shippingFeeAmt = shippingOption?.price || 0;
      const orderPayload = {
        customerName: info.name,
        customerEmail: info.email,
        phone: info.phone,
        address: `${info.address}, ${info.city}`,
        note: info.note,
        shippingMethod: shipping,
        shippingFee: shippingFeeAmt,
        paymentMethod: payment,
        items: items.map(i => ({ productId: i.id, perfumeId: i.id, quantity: i.qty, price: i.discount })),
        subtotal: totalPrice,
        totalAmount: totalPrice + shippingFeeAmt,
      };
      const response = await createOrderApi(orderPayload);
      const savedOrder = response?.data || response?.order || response;
      const orderId = savedOrder?.id || savedOrder?.orderId || savedOrder?.invoiceId || `SPE${Date.now().toString().slice(-6)}`;
      window.__lastOrderId = orderId;
      const localOrder = {
        id: orderId,
        createdAt: savedOrder?.createdAt || new Date().toISOString(),
        userId: user?.id || null,
        userName: info.name,
        userEmail: info.email,
        phone: info.phone,
        address: `${info.address}, ${info.city}`,
        note: info.note,
        shipping: { ...shippingOption, fee: shippingFeeAmt },
        payment,
        items: items.map(i => ({ id: i.id, name: i.name, brand: i.brand, img: i.img, price: i.discount, qty: i.qty })),
        subtotal: totalPrice,
        shippingFee: shippingFeeAmt,
        total: totalPrice + shippingFeeAmt,
        status: savedOrder?.status || 'pending',
      };
      const allOrders = JSON.parse(localStorage.getItem('synpe_orders') || '[]');
      allOrders.unshift(localOrder);
      localStorage.setItem('synpe_orders', JSON.stringify(allOrders));
      dispatch({ type: 'CLEAR_CART' });
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.alert(`Không thể đặt hàng: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const setField = (k) => (e) => {
    setInfo(f => ({ ...f, [k]: e.target.value }));
    setErrors(prev => ({ ...prev, [k]: '' }));
  };

  if (step === 4) {
    return (
      <SuccessWrap>
        <div className="icon"><CheckCircleFill size={72} /></div>
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã tin tưởng SynPe. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
        <div className="order-id">Mã đơn hàng: <strong>#{window.__lastOrderId || `SPE${Date.now().toString().slice(-6)}`}</strong></div>
        <div className="actions">
          <button className="primary" onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
        </div>
      </SuccessWrap>
    );
  }

  const STEPS = ['Thông tin', 'Vận chuyển', 'Thanh toán'];

  return (
    <Wrapper>
      {/* Back */}
      <BackBtn onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}>
        <ArrowLeft size={16} /> Quay lại
      </BackBtn>

      <h1 className="page-title">Thanh toán</h1>

      {/* Stepper */}
      <Stepper>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="dot">{step > i + 1 ? <CheckCircleFill size={14} /> : i + 1}</div>
              <span>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`line ${step > i + 1 ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </Stepper>

      <Layout>
        {/* LEFT */}
        <Left>
          {/* Step 1: Thông tin */}
          {step === 1 && (
            <Card>
              <h2>Thông tin giao hàng</h2>
              <div className="grid-2">
                <FormGroup error={errors.name}>
                  <label>Họ và tên *</label>
                  <input placeholder="Nguyễn Văn A" value={info.name} onChange={setField('name')} />
                  {errors.name && <span className="err">{errors.name}</span>}
                </FormGroup>
                <FormGroup error={errors.phone}>
                  <label>Số điện thoại *</label>
                  <input placeholder="0901 234 567" value={info.phone} onChange={setField('phone')} />
                  {errors.phone && <span className="err">{errors.phone}</span>}
                </FormGroup>
              </div>
              <FormGroup error={errors.email}>
                <label>Email *</label>
                <input type="email" placeholder="email@example.com" value={info.email} onChange={setField('email')} />
                {errors.email && <span className="err">{errors.email}</span>}
              </FormGroup>
              <FormGroup error={errors.address}>
                <label>Địa chỉ *</label>
                <input placeholder="Số nhà, tên đường, phường/xã" value={info.address} onChange={setField('address')} />
                {errors.address && <span className="err">{errors.address}</span>}
              </FormGroup>
              <FormGroup error={errors.city}>
                <label>Tỉnh / Thành phố *</label>
                <input placeholder="Hà Nội" value={info.city} onChange={setField('city')} />
                {errors.city && <span className="err">{errors.city}</span>}
              </FormGroup>
              <FormGroup>
                <label>Ghi chú</label>
                <textarea placeholder="Ghi chú thêm về đơn hàng..." value={info.note} onChange={setField('note')} rows={3} />
              </FormGroup>
              <NextBtn onClick={nextStep}>Tiếp theo: Vận chuyển →</NextBtn>
            </Card>
          )}

          {/* Step 2: Vận chuyển */}
          {step === 2 && (
            <Card>
              <h2>Phương thức vận chuyển</h2>
              <div className="shipping-list">
                {SHIPPING_OPTIONS.map(opt => (
                  <label key={opt.id} className={`option-card ${shipping === opt.id ? 'selected' : ''}`}>
                    <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} />
                    <Truck size={20} />
                    <div className="opt-info">
                      <strong>{opt.label}</strong>
                      <span>{opt.desc}</span>
                    </div>
                    <div className="opt-price">{fmt(opt.price)}</div>
                  </label>
                ))}
              </div>
              <div className="trust">
                <Shield size={16} /> Giao hàng toàn quốc. Hàng được đóng gói kỹ càng, đảm bảo chất lượng.
              </div>
              <NextBtn onClick={nextStep}>Tiếp theo: Thanh toán →</NextBtn>
            </Card>
          )}

          {/* Step 3: Thanh toán */}
          {step === 3 && (
            <Card>
              <h2>Phương thức thanh toán</h2>
              <div className="shipping-list">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} className={`option-card ${payment === m.id ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} />
                    {m.icon}
                    <div className="opt-info"><strong>{m.label}</strong></div>
                  </label>
                ))}
              </div>
              {payment === 'card' && (
                <CardForm>
                  <FormGroup><label>Số thẻ</label><input placeholder="1234 5678 9012 3456" /></FormGroup>
                  <div className="grid-2">
                    <FormGroup><label>Ngày hết hạn</label><input placeholder="MM/YY" /></FormGroup>
                    <FormGroup><label>CVV</label><input placeholder="123" /></FormGroup>
                  </div>
                  <FormGroup><label>Tên chủ thẻ</label><input placeholder="NGUYEN VAN A" /></FormGroup>
                </CardForm>
              )}
              {payment === 'bank' && (
                <BankInfo>
                  <p>Chuyển khoản đến:</p>
                  <div className="bank-row"><span>Ngân hàng:</span><strong>Vietcombank</strong></div>
                  <div className="bank-row"><span>Số tài khoản:</span><strong>1234 5678 9012</strong></div>
                  <div className="bank-row"><span>Chủ tài khoản:</span><strong>CONG TY SYNPE</strong></div>
                  <div className="bank-row"><span>Nội dung CK:</span><strong>SPE + Số điện thoại</strong></div>
                </BankInfo>
              )}
              <PlaceOrderBtn onClick={handleOrder} disabled={loading}>
                {loading ? <><span className="spinner" /> Đang xử lý...</> : `Đặt hàng · ${fmt(grandTotal)}`}
              </PlaceOrderBtn>
            </Card>
          )}
        </Left>

        {/* RIGHT: Order Summary */}
        <Right>
          <Card className="summary">
            <h2>Đơn hàng ({items.length} sản phẩm)</h2>
            <div className="items-list">
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="img-wrap">
                    <img src={item.img} alt={item.name} />
                    <span className="qty">{item.qty}</span>
                  </div>
                  <div className="item-details">
                    <p>{item.name}</p>
                    <span>{item.brand} · {item.ml}ml</span>
                  </div>
                  <strong>{fmt(item.discount * item.qty)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-rows">
              <div className="row"><span>Tạm tính</span><span>{fmt(totalPrice)}</span></div>
              <div className="row"><span>Phí vận chuyển</span><span>{fmt(shippingFee)}</span></div>
              <div className="row total"><span>Tổng cộng</span><strong>{fmt(grandTotal)}</strong></div>
            </div>
          </Card>
        </Right>
      </Layout>
    </Wrapper>
  );
};

/* ─── Styled Components ───────────────────────────────────────── */

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;

const Wrapper = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 40px 20px 80px;
  animation: ${fadeIn} 0.4s ease;
  .page-title { font-size: 28px; font-weight: 800; color: #D4AF37; margin: 12px 0 32px; }
`;

const BackBtn = styled.button`
  background: transparent; border: none;
  color: #888; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; gap: 6px; padding: 0;
  &:hover { color: #D4AF37; }
`;

const Stepper = styled.div`
  display: flex; align-items: center; margin-bottom: 40px;
  .step {
    display: flex; align-items: center; gap: 8px;
    .dot {
      width: 30px; height: 30px; border-radius: 50%;
      background: rgba(255,255,255,0.07); border: 2px solid #444;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: #888;
      transition: all 0.3s;
    }
    span { font-size: 14px; color: #888; transition: color 0.3s; }
    &.active .dot { background: #D4AF37; border-color: #D4AF37; color: #000; }
    &.active span { color: #D4AF37; font-weight: 600; }
    &.done .dot { background: #2ecc71; border-color: #2ecc71; color: #fff; }
    &.done span { color: #2ecc71; }
    body:not(.dark) & .dot { background: #f8f7f2; border-color: #ddd; color: #999; }
    body:not(.dark) &.active .dot { background: #D4AF37; border-color: #D4AF37; color: #000; }
  }
  .line {
    flex: 1; height: 2px; background: rgba(255,255,255,0.1); margin: 0 12px;
    transition: background 0.3s;
    &.done { background: #2ecc71; }
    body:not(.dark) & { background: #eee; }
  }
`;

const Layout = styled.div`
  display: grid; grid-template-columns: 1fr 380px; gap: 28px;
  @media(max-width:820px) { grid-template-columns: 1fr; }
`;

const Left = styled.div``;
const Right = styled.div``;

const Card = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px; padding: 28px;
  body:not(.dark) & { background: #fff; border-color: #eee; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
  h2 { font-size: 18px; font-weight: 700; margin: 0 0 22px; color: inherit; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .shipping-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .option-card {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 16px; border-radius: 12px;
    border: 2px solid rgba(255,255,255,0.08); cursor: pointer;
    transition: all 0.2s;
    input[type=radio] { display: none; }
    svg { color: #888; flex-shrink: 0; }
    .opt-info { flex: 1; strong { display: block; font-size: 14px; }
      span { font-size: 12px; color: #888; } }
    .opt-price { font-weight: 700; color: #D4AF37; font-size: 14px; }
    &.selected { border-color: #D4AF37; background: rgba(212,175,55,0.08); svg { color: #D4AF37; } }
    body:not(.dark) & { border-color: #eee; background: #fafaf8; &.selected { background: #fffbe8; } }
  }
  .trust {
    display: flex; align-items: center; gap: 8px;
    color: #888; font-size: 13px; margin-bottom: 16px;
    svg { color: #2ecc71; flex-shrink: 0; }
  }

  /* Summary */
  &.summary .items-list { margin-bottom: 20px; max-height: 320px; overflow-y: auto;
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
  }
  &.summary .summary-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    body:not(.dark) & { border-bottom-color: #f0f0f0; }
    .img-wrap { position: relative; flex-shrink: 0;
      img { width: 56px; height: 64px; object-fit: cover; border-radius: 8px; }
      .qty { position: absolute; top: -6px; right: -6px; width: 20px; height: 20px;
        background: #D4AF37; color: #000; border-radius: 50%; font-size: 11px;
        font-weight: 700; display: flex; align-items: center; justify-content: center; }
    }
    .item-details { flex: 1;
      p { font-size: 13px; font-weight: 600; margin: 0 0 3px; }
      span { font-size: 12px; color: #888; }
    }
    strong { font-size: 13px; color: #D4AF37; }
  }
  &.summary .summary-rows .row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; font-size: 14px; color: #888;
    body:not(.dark) & { color: #666; }
    &.total { font-size: 16px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 6px;
      padding-top: 14px; color: inherit;
      body:not(.dark) & { border-color: #eee; }
      strong { color: #D4AF37; font-size: 20px; }
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 14px;
  label { display: block; font-size: 13px; color: #888; margin-bottom: 6px;
    body:not(.dark) & { color: #666; } }
  input, textarea {
    width: 100%; padding: 12px 16px; box-sizing: border-box;
    border: 1px solid ${p => p.error ? '#e74c3c' : 'rgba(255,255,255,0.1)'};
    border-radius: 10px; outline: none;
    background: rgba(255,255,255,0.05); color: inherit; font-size: 14px;
    font-family: inherit; resize: vertical; transition: 0.2s;
    &::placeholder { color: #555; }
    &:focus { border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
    body:not(.dark) & { background: #f8f7f2; border-color: ${p => p.error ? '#e74c3c' : '#e0d5b0'};
      color: #111; &::placeholder { color: #aaa; } }
  }
  .err { font-size: 12px; color: #e74c3c; margin-top: 4px; display: block; }
`;

const CardForm = styled.div`
  background: rgba(255,255,255,0.03); border-radius: 12px;
  padding: 20px; margin-bottom: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  body:not(.dark) & { background: #fafaf8; border-color: #f0e8c0; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
`;

const BankInfo = styled.div`
  background: rgba(46,204,113,0.07); border: 1px solid rgba(46,204,113,0.2);
  border-radius: 12px; padding: 18px; margin-bottom: 16px;
  p { font-size: 13px; color: #888; margin: 0 0 12px; }
  .bank-row { display: flex; justify-content: space-between;
    font-size: 14px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    span { color: #888; } strong { color: #2ecc71; }
  }
`;

const spin = keyframes`to{transform:rotate(360deg)}`;

const NextBtn = styled.button`
  width: 100%; padding: 14px; background: #D4AF37; color: #000;
  border: none; border-radius: 12px; font-size: 15px; font-weight: 700;
  cursor: pointer; margin-top: 8px; transition: all 0.3s;
  &:hover { background: #c9a227; transform: translateY(-1px); }
`;

const PlaceOrderBtn = styled.button`
  width: 100%; padding: 16px; background: linear-gradient(135deg, #D4AF37, #f0c84a);
  color: #000; border: none; border-radius: 12px; font-size: 16px; font-weight: 800;
  cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
  justify-content: center; gap: 10px;
  &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.4); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #000; border-radius: 50%; animation: ${spin} 0.7s linear infinite; }
`;

const EmptyWrap = styled.div`
  text-align: center; padding: 80px 20px;
  p { font-size: 20px; margin-bottom: 20px; }
  button { padding: 12px 28px; background: #D4AF37; color: #000; border: none;
    border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; }
`;

const SuccessWrap = styled.div`
  text-align: center; padding: 80px 20px; max-width: 500px; margin: 0 auto;
  animation: ${fadeIn} 0.5s ease;
  .icon { color: #2ecc71; margin-bottom: 24px; }
  h1 { font-size: 30px; font-weight: 800; margin: 0 0 16px; }
  p { color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
  .order-id { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3);
    border-radius: 10px; padding: 14px; font-size: 15px; margin-bottom: 32px; }
  .actions { display: flex; gap: 12px; justify-content: center; }
  .primary { padding: 14px 32px; background: #D4AF37; color: #000; border: none;
    border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;
    &:hover { background: #c9a227; } }
`;

export default Checkout;
