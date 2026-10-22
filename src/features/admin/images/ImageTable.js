import React from 'react';

export default function ImageTable({ images, onDelete }) {
    return (
        <div className="customer-table-wrapper">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Image ID</th>
                        <th>Tên ảnh (Name)</th>
                        <th>Perfume ID</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((img) => {
                        const imgId = img.imageId || img.id;
                        // Lấy perfumeId tùy thuộc vào cách Backend trả về (đối tượng perfume hay perfumeId trực tiếp)
                        const perfumeId = img.perfume?.perfumeId || img.perfume?.id || img.perfumeId || 'N/A';

                        return (
                            <tr key={imgId}>
                                <td>{imgId}</td>
                                <td>{img.name}</td>
                                <td>{perfumeId}</td>
                                <td>
                                    <div className="customer-actions">
                                        <button
                                            type="button"
                                            onClick={() => onDelete(img)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {images.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không tìm thấy hình ảnh nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}