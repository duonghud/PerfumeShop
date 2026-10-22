import React, { useState } from 'react';

export default function PaymentMethodEditForm({ paymentMethod, onBack, onSuccess }) {
    const id = paymentMethod.paymentMethodId || paymentMethod.id;
    const [name, setName] = useState(paymentMethod.name || '');
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

            const response = await fetch(`http://localhost:8080/payment-methods/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ name: name.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            alert('Cập nhật phương thức thanh toán thành công.');
            onSuccess(); // Quay về danh sách và load lại dữ liệu
        } catch (err) {
            setError(err.message || 'Không thể lưu thay đổi.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="customer-modal" style={{ position: 'relative', margin: '20px auto', maxWidth: '500px' }}>
            <h2>Cập nhật phương thức thanh toán (ID: {id})</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Tên phương thức thanh toán</label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className="customer-modal-actions">
                    <button type="submit" disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <button type="button" onClick={onBack} disabled={saving}>
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
}