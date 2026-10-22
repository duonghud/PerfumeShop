import React from 'react';

export default function PerfumeTypeTable({ perfumeTypes, onDetail, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên loại nước hoa</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {perfumeTypes.map((item) => {
                        const id = item.perfumeTypeId || item.id;
                        const shortDesc = item.description 
                            ? (item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description) 
                            : 'Không có mô tả';

                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{item.name}</td>
                                <td>{shortDesc}</td>
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

                    {perfumeTypes.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không tìm thấy loại nước hoa nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}