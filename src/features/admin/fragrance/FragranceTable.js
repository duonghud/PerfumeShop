import React from 'react';

export default function FragranceTable({ fragrances, onDetail, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên hương thơm</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {fragrances.map((item) => {
                        const id = item.fragranceId || item.id;
                        // Rút gọn mô tả nếu quá dài
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

                    {fragrances.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không tìm thấy hương thơm nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}