import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Person, Lock, Envelope, Eye, EyeSlash } from 'react-bootstrap-icons';
import { useAuth } from '../../../shared/context/AuthContext';

const AuthModal = () => {
  const { authModal, closeAuth, openLogin, openRegister, login, register } = useAuth();
  const { open, mode } = authModal;

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register') {
      if (!form.name.trim()) return setError('Vui lòng nhập họ tên');
      if (form.password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự');
      if (form.password !== form.confirm) return setError('Mật khẩu xác nhận không khớp');
    }
    setLoading(true);
    const res = mode === 'login'
      ? login(form.email, form.password)
      : register(form.name, form.email, form.password);
    setLoading(false);
    if (!res.ok) setError(res.error);
    else setForm({ name: '', email: '', password: '', confirm: '' });
  };

  const switchMode = () => {
    setError('');
    setForm({ name: '', email: '', password: '', confirm: '' });
    mode === 'login' ? openRegister() : openLogin();
  };

  return (
    <>
      <Overlay onClick={closeAuth} />
      <Modal>
        <button className="close" onClick={closeAuth}><X size={22} /></button>

        <div className="modal-logo">SynPe</div>
        <h2>{mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</h2>
        <p className="subtitle">
          {mode === 'login' ? 'Chào mừng bạn trở lại!' : 'Tham gia cộng đồng SynPe ngay hôm nay'}
        </p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <Field>
              <Person size={16} className="ico" />
              <input placeholder="Họ và tên" value={form.name} onChange={set('name')} required />
            </Field>
          )}
          <Field>
            <Envelope size={16} className="ico" />
            <input type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
          </Field>
          <Field>
            <Lock size={16} className="ico" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={set('password')}
              required
            />
            <button type="button" className="eye" onClick={() => setShowPw(v => !v)}>
              {showPw ? <EyeSlash size={15} /> : <Eye size={15} />}
            </button>
          </Field>
          {mode === 'register' && (
            <Field>
              <Lock size={16} className="ico" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Xác nhận mật khẩu"
                value={form.confirm}
                onChange={set('confirm')}
                required
              />
            </Field>
          )}

          {mode === 'login' && (
            <div className="forgot"><a href="#forgot">Quên mật khẩu?</a></div>
          )}

          <SubmitBtn disabled={loading}>
            {loading ? <span className="spinner" /> : (mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản')}
          </SubmitBtn>
        </form>

        <div className="divider"><span>hoặc</span></div>

        <SocialBtn type="button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Tiếp tục với Google
        </SocialBtn>

        <p className="switch-mode">
          {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <button type="button" onClick={switchMode}>
            {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </Modal>
    </>
  );
};

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); }`;

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  animation: ${fadeIn} 0.2s ease;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2001;
  background: #0f1117;
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 20px;
  padding: 40px 36px;
  width: 420px;
  max-width: 95vw;
  animation: ${slideUp} 0.3s cubic-bezier(.16,1,.3,1);
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);

  body:not(.dark) & {
    background: #fff;
    border-color: #e0d5b0;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }

  .close {
    position: absolute; top: 16px; right: 16px;
    background: transparent; border: none;
    color: #888; cursor: pointer; padding: 6px;
    border-radius: 50%; transition: all 0.2s;
    display: flex; align-items: center;
    &:hover { background: rgba(255,255,255,0.1); color: #fff; }
    body:not(.dark) &:hover { background: #f0f0f0; color: #333; }
  }

  .modal-logo {
    font-size: 22px; font-weight: 800;
    color: #D4AF37; letter-spacing: 3px;
    margin-bottom: 16px;
  }

  h2 {
    margin: 0 0 6px;
    font-size: 24px; font-weight: 700;
    color: #fff;
    body:not(.dark) & { color: #111; }
  }

  .subtitle {
    color: #888; font-size: 14px; margin: 0 0 24px;
    body:not(.dark) & { color: #666; }
  }

  .error-box {
    background: rgba(231,76,60,0.15);
    border: 1px solid rgba(231,76,60,0.4);
    border-radius: 10px; padding: 12px 16px;
    color: #ff6b6b; font-size: 14px; margin-bottom: 16px;
  }

  .forgot {
    text-align: right; margin-top: -6px; margin-bottom: 6px;
    a { color: #D4AF37; font-size: 13px; text-decoration: none;
      &:hover { text-decoration: underline; } }
  }

  .divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0; color: #555; font-size: 13px;
    body:not(.dark) & { color: #aaa; }
    &::before, &::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
    body:not(.dark) &::before, body:not(.dark) &::after { background: #eee; }
  }

  .switch-mode {
    text-align: center; color: #888; font-size: 14px; margin: 16px 0 0;
    body:not(.dark) & { color: #555; }
    button { background: none; border: none; color: #D4AF37; font-size: 14px;
      font-weight: 600; cursor: pointer; padding: 0;
      &:hover { text-decoration: underline; } }
  }
`;

const Field = styled.div`
  position: relative; margin-bottom: 14px;
  .ico {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%); color: #666; pointer-events: none;
  }
  .eye {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: transparent; border: none; color: #666; cursor: pointer;
    padding: 4px; display: flex; align-items: center;
    &:hover { color: #D4AF37; }
  }
  input {
    width: 100%; height: 48px;
    padding: 0 40px 0 40px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; outline: none;
    background: rgba(255,255,255,0.05);
    color: #fff; font-size: 14px;
    transition: 0.25s; box-sizing: border-box;
    &::placeholder { color: #666; }
    &:focus { border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
    body:not(.dark) & {
      background: #f8f7f2; color: #111;
      border-color: #e0d5b0;
      &::placeholder { color: #aaa; }
      &:focus { border-color: #D4AF37; }
    }
  }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;
const SubmitBtn = styled.button`
  width: 100%; height: 50px;
  background: #D4AF37; color: #000;
  border: none; border-radius: 12px;
  font-size: 15px; font-weight: 700;
  cursor: pointer; margin-top: 8px;
  transition: all 0.3s; display: flex; align-items: center; justify-content: center;
  &:hover:not(:disabled) { background: #c9a227; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
  .spinner {
    width: 20px; height: 20px; border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #000; border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
  }
`;

const SocialBtn = styled.button`
  width: 100%; height: 46px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px; color: #ccc;
  font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.25); color: #fff; }
  body:not(.dark) & { color: #333; border-color: #ddd; &:hover { background: #f5f5f5; } }
`;

export default AuthModal;
