import React from 'react';

export default function PerfumeDetailModal({ perfume, onClose }) {
    if (!perfume) return null;

    const id = perfume.perfumeId || perfume.id;
    const detail = perfume.perfumeDetail || {};

    return (
        <div className="customer-modal-backdrop">
            <div
                className="customer-modal"
                role="dialog"
                aria-modal="true"
                style={{ maxWidth: '600px' }}
            >
                <h2>Chi tiết nước hoa (ID: {id})</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                    <p><strong>Tên nước hoa:</strong> {perfume.name}</p>
                    <p><strong>Giá bán:</strong> {perfume.price ? Number(perfume.price).toLocaleString() + ' đ' : '0 đ'}</p>
                    <p><strong>Loại nước hoa:</strong> {perfume.perfumeType?.name || 'N/A'}</p>
                    <p><strong>Thương hiệu:</strong> {detail.brand || 'N/A'}</p>
                    <p><strong>Giới tính:</strong> {detail.gender || 'Unisex'}</p>
                    <p><strong>Dung tích:</strong> {detail.volume ? `${detail.volume} ml` : 'N/A'}</p>
                    <p><strong>Nồng độ:</strong> {detail.concentration || 'N/A'}</p>
                    <p><strong>Nhóm hương:</strong> {detail.fragrance?.name || 'N/A'}</p>
                </div>

                <div style={{ marginTop: '12px', textAlign: 'left' }}>
                    <strong>Mô tả chi tiết:</strong>
                    <p style={{ background: '#f9fafb', padding: '10px', borderRadius: '6px', marginTop: '6px' }}>
                        {detail.description || 'Không có mô tả.'}
                    </p>
                </div>

                <div className="customer-modal-actions" style={{ marginTop: '16px' }}>
                    <button type="button" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}