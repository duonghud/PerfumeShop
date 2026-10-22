import React from 'react';

export default function PerfumeTypeEditModal({
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
                aria-labelledby="perfume-type-edit-title"
            >
                <h2 id="perfume-type-edit-title">Cập nhật loại nước hoa</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <label htmlFor="perfume-type-edit-name">Tên loại nước hoa</label>
                    <input
                        id="perfume-type-edit-name"
                        name="name"
                        placeholder="Ví dụ: Eau de Parfum, Eau de Toilette..."
                        value={form.name}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="perfume-type-edit-description">Mô tả</label>
                    <textarea
                        id="perfume-type-edit-description"
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
