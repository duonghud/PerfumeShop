import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Person, Basket, List, X, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { totalItems, dispatch } = useCart();
  const { user, logout, openLogin, openRegister } = useAuth();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <Wrapper>
      <Link to="/" className="logo">SynPe</Link>

      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Sản phẩm</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
        <Link to="/admin" onClick={() => setMenuOpen(false)} style={{color:'#D4AF37'}}>Admin</Link>
      </nav>

      <div className="right">
        <SearchForm onSubmit={handleSearch}>
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm nước hoa..." type="search" />
        </SearchForm>

        {/* Account */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          {user ? (
            <>
              <AvatarBtn onClick={() => setUserMenuOpen(v => !v)} title={user.name}>
                {user.avatar}
              </AvatarBtn>
              {userMenuOpen && (
                <UserDropdown>
                  <div className="ud-header">
                    <div className="ud-avatar">{user.avatar}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="ud-divider" />
                  <button className="ud-item" onClick={() => { setUserMenuOpen(false); navigate('/orders'); }}>
                    <PersonCircle size={15} /> Lịch sử đặt hàng
                  </button>
                  <button className="ud-item danger" onClick={() => { logout(); setUserMenuOpen(false); }}>
                    <BoxArrowRight size={15} /> Đăng xuất
                  </button>
                </UserDropdown>
              )}
            </>
          ) : (
            <AuthBtns>
              <button className="login-btn" onClick={openLogin}>Đăng nhập</button>
              <button className="register-btn" onClick={openRegister}>Đăng ký</button>
            </AuthBtns>
          )}
        </div>

        <button className="icon-btn cart-btn" title="Giỏ hàng" onClick={() => dispatch({ type: 'OPEN_CART' })}>
          <Basket size={22} />
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 5%; background: #0B0D13; color: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  position: sticky; top: 0; z-index: 999; gap: 20px;

  .logo { font-size: 26px; font-weight: 800; color: #D4AF37; letter-spacing: 3px;
    text-decoration: none; flex-shrink: 0; transition: opacity 0.2s; &:hover { opacity: 0.85; } }

  .menu {
    display: flex; gap: 28px;
    a { color: #ccc; text-decoration: none; font-size: 15px; position: relative;
      transition: color 0.3s; white-space: nowrap;
      &:hover { color: #D4AF37; }
      &::after { content: ''; position: absolute; width: 0; height: 2px; background: #D4AF37;
        bottom: -6px; left: 0; transition: width 0.3s; }
      &:hover::after { width: 100%; } }
  }

  .right { display: flex; align-items: center; gap: 10px; }

  .icon-btn { width: 36px; height: 36px; border-radius: 50%; border: none;
    background: transparent; color: #ccc; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.3s; position: relative;
    &:hover { background: rgba(212,175,55,0.2); color: #D4AF37; }
    .badge { position: absolute; top: -2px; right: -2px; width: 18px; height: 18px;
      border-radius: 50%; background: #D4AF37; color: #000; font-size: 10px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; } }

  .cart-btn { color: #D4AF37; }

  .menu-toggle { display: none; background: transparent; border: none; color: #fff; cursor: pointer; padding: 4px; }

  @media (max-width: 900px) {
    .menu { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0;
      background: #0d1018; padding: 20px 5%; gap: 18px; border-top: 1px solid rgba(255,255,255,0.08);
      &.open { display: flex; } }
    .menu-toggle { display: flex; }
  }
`;

const SearchForm = styled.form`
  position: relative; display: flex; align-items: center;
  .search-icon { position: absolute; left: 11px; width: 15px; height: 15px; fill: #888; pointer-events: none; }
  input { height: 36px; width: 200px; padding: 0 12px 0 32px; border-radius: 18px;
    border: 1px solid transparent; outline: none; background: #1a1d24; color: #fff; font-size: 13px; transition: 0.3s;
    &::placeholder { color: #888; }
    &:focus { border-color: #D4AF37; box-shadow: 0 0 8px rgba(212,175,55,0.3); width: 240px; } }
  body:not(.dark) & input { background: rgba(255,255,255,0.12); color: #fff; &::placeholder { color: rgba(255,255,255,0.6); } }
  @media (max-width: 600px) { input { width: 130px; &:focus { width: 150px; } } }
`;

const AvatarBtn = styled.button`
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #c9a227);
  border: none; color: #000; font-weight: 800; font-size: 15px;
  cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s; &:hover { transform: scale(1.1); }
`;

const UserDropdown = styled.div`
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 240px; background: #0f1117; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px; padding: 6px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  z-index: 100;
  body:not(.dark) & { background: #fff; border-color: #eee; box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

  .ud-header { display: flex; align-items: center; gap: 12px; padding: 12px 12px 14px;
    .ud-avatar { width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg,#D4AF37,#c9a227); color: #000; font-weight: 800;
      font-size: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    strong { display: block; font-size: 14px; }
    span { font-size: 12px; color: #888; display: block; max-width: 160px;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } }

  .ud-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0 4px 6px;
    body:not(.dark) & { background: #f0f0f0; } }

  .ud-item { width: 100%; background: transparent; border: none; color: inherit; text-align: left;
    padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; gap: 10px; transition: background 0.2s;
    &:hover { background: rgba(255,255,255,0.06); }
    body:not(.dark) &:hover { background: #f5f5f5; }
    &.danger { color: #e74c3c; &:hover { background: rgba(231,76,60,0.1); } }
  }
`;

const AuthBtns = styled.div`
  display: flex; gap: 8px;
  .login-btn { background: transparent; border: 1px solid rgba(212,175,55,0.4);
    color: #D4AF37; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
    &:hover { background: rgba(212,175,55,0.1); } }
  .register-btn { background: #D4AF37; color: #000; border: none;
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
    &:hover { background: #c9a227; } }
  @media(max-width:700px) { .register-btn { display: none; } }
  @media(max-width:500px) { display: none; }
`;

export default Header;
