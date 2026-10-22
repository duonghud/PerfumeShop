import React from 'react';

export default function AdminTable({ admins, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => {
                        const id = admin.adminId || admin.id;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{admin.fullName}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <div className="customer-actions">
                                        <button type="button" onClick={() => onEdit(admin)}>
                                            Sửa
                                        </button>
                                        <button type="button" onClick={() => onDelete(admin)}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {admins.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không tìm thấy quản trị viên nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}