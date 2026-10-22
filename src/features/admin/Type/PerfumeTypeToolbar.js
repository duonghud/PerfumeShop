import React from 'react';

export default function PerfumeTypeToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên hoặc mô tả loại nước hoa..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm loại nước hoa"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm loại nước hoa
            </button>
        </div>
    );
}