import React from 'react';

export default function AdminToolbar({ keyword, setKeyword, onOpenCreate }) {
    return (
        <div className="customer-toolbar">
            <input
                type="search"
                placeholder="Tìm theo họ tên hoặc email quản trị viên..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                aria-label="Tìm kiếm quản trị viên"
            />
            <button type="button" onClick={onOpenCreate}>
                + Thêm quản trị viên
            </button>
        </div>
    );
}