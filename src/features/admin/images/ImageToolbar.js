import React from 'react';

export default function ImageToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo tên ảnh hoặc ID nước hoa..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm hình ảnh"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm hình ảnh
            </button>
        </div>
    );
}