import React from 'react';

export default function CustomerTable({ customers, onDetail, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => {
                        const custId = customer.customerId || customer.id;
                        return (
                            <tr key={custId}>
                                <td>{custId}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <div className="customer-actions">
                                        <button type="button" onClick={() => onEdit(customer)}>
                                            Sửa
                                        </button>
                                        <button type="button" onClick={() => onDelete(customer)}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                Không tìm thấy khách hàng.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}