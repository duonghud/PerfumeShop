import React from 'react';

export default function AdminCreateModal({
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
                aria-labelledby="admin-create-title"
            >
                <h2 id="admin-create-title">Thêm quản trị viên mới</h2>

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

                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={form.password}
                        onChange={onChange}
                        required
                        autoComplete="new-password"
                    />

                    <div className="customer-modal-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? 'Đang lưu...' : 'Thêm mới'}
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