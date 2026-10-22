import React from 'react';

export default function FragranceCreateModal({
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
                aria-labelledby="fragrance-create-title"
            >
                <h2 id="fragrance-create-title">Thêm hương thơm mới</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <label htmlFor="fragrance-create-name">Tên hương thơm</label>
                    <input
                        id="fragrance-create-name"
                        name="name"
                        placeholder="Ví dụ: Woody, Floral, Fresh..."
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="fragrance-create-description">Mô tả</label>
                    <textarea
                        id="fragrance-create-description"
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
