import React from 'react';

export default function FragranceToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên hoặc mô tả hương thơm..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm hương thơm"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm hương thơm
            </button>
        </div>
    );
}