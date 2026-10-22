import React from 'react';

export default function PaymentMethodTable({ paymentMethods, onEdit, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên phương thức thanh toán</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentMethods.map((item) => {
                        const id = item.paymentMethodId || item.id;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{item.name}</td>
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

                    {paymentMethods.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                Không tìm thấy phương thức thanh toán nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}