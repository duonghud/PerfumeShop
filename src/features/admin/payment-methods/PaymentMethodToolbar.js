import React from 'react';

export default function PaymentMethodToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên phương thức thanh toán..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm phương thức thanh toán"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm phương thức thanh toán
            </button>
        </div>
    );
}