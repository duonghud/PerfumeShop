import React from 'react';

export default function PerfumeTable({ perfumes, onDetail, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Thương hiệu</th>
                        <th>Giới tính</th>
                        <th>Dung tích (ml)</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {perfumes.map((item) => {
                        const id = item.perfumeId || item.id;
                        const priceFormatted = item.price ? Number(item.price).toLocaleString() + ' đ' : '0 đ';
                        const typeName = item.perfumeType?.name || 'N/A';
                        
                        // Thông tin từ PerfumeDetail (nếu có)
                        const detail = item.perfumeDetail || {};
                        const brand = detail.brand || 'N/A';
                        const gender = detail.gender || 'Unisex';
                        const volume = detail.volume ? `${detail.volume} ml` : 'N/A';

                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td><strong>{item.name}</strong></td>
                                <td>{priceFormatted}</td>
                                <td>{typeName}</td>
                                <td>{brand}</td>
                                <td>{gender}</td>
                                <td>{volume}</td>
                                <td>
                                    <div className="customer-actions">
                                        <button type="button" onClick={() => onDetail(item)}>
                                            Chi tiết
                                        </button>
                                        <button type="button" onClick={() => onEdit(item)}>
                                            Sửa
                                        </button>
                                        <button type="button" onClick={() => onDelete(item)}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {perfumes.length === 0 && (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center' }}>
                                Không tìm thấy nước hoa nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}