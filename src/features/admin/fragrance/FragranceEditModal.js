import React from 'react';

export default function FragranceEditModal({
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
                aria-labelledby="fragrance-edit-title"
            >
                <h2 id="fragrance-edit-title">Cập nhật hương thơm</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <label htmlFor="fragrance-edit-name">Tên hương thơm</label>
                    <input
                        id="fragrance-edit-name"
                        name="name"
                        placeholder="Ví dụ: Woody, Floral, Fresh..."
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="fragrance-edit-description">Mô tả</label>
                    <textarea
                        id="fragrance-edit-description"
                        name="description"
                        rows="4"
                        placeholder="Nhập mô tả chi tiết về hương thơm..."
                        value={form.description}
                        onChange={onChange}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            marginBottom: '14px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box'
                        }}
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
