import React, { useState } from 'react';

export default function PaymentMethodCreateForm({ onBack, onSuccess }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError('Vui lòng nhập tên phương thức thanh toán.');
            return;
        }

        try {
            setSaving(true);
            setError('');

            const response = await fetch('http://localhost:8080/payment_methodss/create', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ name: name.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            alert('Thêm phương thức thanh toán thành công.');
            onSuccess(); // Quay về danh sách và load lại dữ liệu
        } catch (err) {
            setError(err.message || 'Không thể lưu phương thức thanh toán.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="customer-modal" style={{ position: 'relative', margin: '20px auto', maxWidth: '500px' }}>
            <h2>Thêm phương thức thanh toán mới</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Tên phương thức thanh toán</label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: COD, Chuyển khoản ngân hàng..."
                    required
                />

                <div className="customer-modal-actions">
                    <button type="submit" disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Thêm mới'}
                    </button>
                    <button type="button" onClick={onBack} disabled={saving}>
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
}