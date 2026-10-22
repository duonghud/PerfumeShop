import React from 'react';

export default function CustomerToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên, số điện thoại, email..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm khách hàng"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm khách hàng
            </button>
        </div>
    );
}