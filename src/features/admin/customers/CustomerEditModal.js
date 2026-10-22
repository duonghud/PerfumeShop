import React from 'react';

export default function CustomerEditModal({
    form,
    error,
    saving,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="customer-modal-backdrop">
            <div
                className="customer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="customer-edit-title"
            >
                <h2 id="customer-edit-title">Cập nhật khách hàng</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                        id="fullName"
                        name="fullName"
                        placeholder="Nhập họ và tên..."
                        value={form.fullName}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        id="phone"
                        name="phone"
                        placeholder="Nhập số điện thoại..."
                        value={form.phone}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Nhập địa chỉ email..."
                        value={form.email}
                        onChange={onChange}
                        required
                    />

                    <div className="customer-modal-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                        <button type="button" onClick={onClose} disabled={saving}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}