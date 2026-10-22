import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result && result.ok) {
        navigate('/admin', { replace: true });
      } else {
        setError(result?.error || 'Email hoặc mật khẩu không chính xác!');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#fff' }}>
      <form onSubmit={handleLogin} style={{ background: '#1e293b', padding: '40px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Đăng nhập Quản trị</h2>
        
        {error && (
          <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="nguyensykhanhanh@gmail.com"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', background: '#334155', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Mật khẩu</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', background: '#334155', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading ? '#64748b' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}