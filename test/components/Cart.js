import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { X, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

const Cart = () => {
  const { items, open, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    dispatch({ type: 'CLOSE_CART' });
    navigate('/checkout');
  };

  return (
    <>
      <Overlay open={open} onClick={() => dispatch({ type: 'CLOSE_CART' })} />
      <Drawer open={open}>
        <div className="cart-header">
          <h2>Giỏ hàng ({items.length})</h2>
          <button className="close-btn" onClick={() => dispatch({ type: 'CLOSE_CART' })}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="empty">
              <p>Giỏ hàng trống 🛒</p>
              <span>Thêm sản phẩm để bắt đầu mua sắm</span>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-price">{fmt(item.discount)}</p>
                  <div className="qty-controls">
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                  <Trash size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Tổng cộng:</span>
              <strong>{fmt(totalPrice)}</strong>
            </div>
            <button className="checkout-btn" onClick={goCheckout}>Thanh toán ngay</button>
            <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Xóa giỏ hàng</button>
          </div>
        )}
      </Drawer>
    </>
  );
};

const Overlay = styled.div`
  display: ${p => p.open ? 'block' : 'none'};
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 1100;
  backdrop-filter: blur(2px);
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 95vw;
  height: 100vh;
  background: #0b0d13;
  color: #fff;
  z-index: 1200;
  transform: translateX(${p => p.open ? '0' : '100%'});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 30px rgba(0,0,0,0.5);

  body:not(.dark) & {
    background: #fff;
    color: #111;
  }

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.1);

    body:not(.dark) & {
      border-bottom-color: #eee;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      color: #D4AF37;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      transition: background 0.2s;

      &:hover { background: rgba(255,255,255,0.1); }
    }
  }

  .cart-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
  }

  .empty {
    text-align: center;
    padding: 60px 0;

    p {
      font-size: 20px;
      margin-bottom: 8px;
    }

    span {
      color: #888;
      font-size: 14px;
    }
  }

  .cart-item {
    display: flex;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    position: relative;

    body:not(.dark) & {
      border-bottom-color: #f0f0f0;
    }

    img {
      width: 72px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .item-info {
      flex: 1;

      .item-name {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 3px;
      }

      .item-brand {
        font-size: 12px;
        color: #888;
        margin: 0 0 5px;
      }

      .item-price {
        color: #D4AF37;
        font-weight: 700;
        font-size: 14px;
        margin: 0 0 8px;
      }

      .qty-controls {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid #D4AF37;
          background: transparent;
          color: #D4AF37;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          transition: all 0.2s;

          &:hover {
            background: #D4AF37;
            color: #000;
          }
        }

        span {
          font-weight: 700;
          min-width: 20px;
          text-align: center;
        }
      }
    }

    .remove-btn {
      position: absolute;
      top: 14px;
      right: 0;
      background: transparent;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 4px;
      transition: color 0.2s;

      &:hover { color: #e74c3c; }
    }
  }

  .cart-footer {
    padding: 20px 24px;
    border-top: 1px solid rgba(255,255,255,0.1);

    body:not(.dark) & {
      border-top-color: #eee;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 16px;

      strong {
        color: #D4AF37;
        font-size: 18px;
      }
    }

    .checkout-btn {
      width: 100%;
      padding: 14px;
      background: #D4AF37;
      color: #000;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 10px;
      transition: all 0.3s;

      &:hover {
        background: #c9a227;
        transform: translateY(-1px);
      }
    }

    .clear-btn {
      width: 100%;
      padding: 10px;
      background: transparent;
      color: #888;
      border: 1px solid #444;
      border-radius: 10px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #e74c3c;
        color: #e74c3c;
      }
    }
  }
`;

export default Cart;
