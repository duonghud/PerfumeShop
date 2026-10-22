import React from 'react';

export default function PerfumeTypeDetailModal({ perfumeType, onClose }) {
    if (!perfumeType) return null;

    const id = perfumeType.perfumeTypeId || perfumeType.id;

    return (
        <div className="customer-modal-backdrop">
            <div
                className="customer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="perfume-type-detail-title"
            >
                <h2 id="perfume-type-detail-title">Chi tiết loại nước hoa</h2>
                <p>
                    <strong>ID:</strong> {id}
                </p>
                <p>
                    <strong>Tên loại nước hoa:</strong> {perfumeType.name}
                </p>
                <p>
                    <strong>Mô tả:</strong> {perfumeType.description || 'Không có mô tả'}
                </p>

                <button type="button" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
}