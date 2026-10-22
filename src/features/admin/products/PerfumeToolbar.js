import React from 'react';

export default function PerfumeToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên nước hoa hoặc loại nước hoa..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm nước hoa"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm nước hoa
            </button>
        </div>
    );
}