import React from 'react';

export default function PerfumeTypeCreateModal({
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
                aria-labelledby="perfume-type-create-title"
            >
                <h2 id="perfume-type-create-title">Thêm loại nước hoa mới</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <label htmlFor="perfume-type-create-name">Tên loại nước hoa (Name)</label>
                    <input
                        id="perfume-type-create-name"
                        name="name"
                        placeholder="Ví dụ: Eau de Parfum, Eau de Toilette..."
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="perfume-type-create-description">Mô tả (Description)</label>
                    <textarea
                        id="perfume-type-create-description"
                        name="description"
                        rows="4"
                        placeholder="Nhập mô tả chi tiết về loại nước hoa..."
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
