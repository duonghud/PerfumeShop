import React, { useState, useEffect } from 'react';

export default function PerfumeCreateForm({ onBack, onSuccess }) {
    // State thông tin Perfume
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [perfumeTypeId, setPerfumeTypeId] = useState('');

    // State thông tin PerfumeDetail
    const [detailName, setDetailName] = useState('');
    const [brand, setBrand] = useState('');
    const [gender, setGender] = useState('Unisex');
    const [volume, setVolume] = useState('');
    const [concentration, setConcentration] = useState('EDP');
    const [description, setDescription] = useState('');
    const [fragranceId, setFragranceId] = useState('');

    // State danh sách Dropdown
    const [perfumeTypes, setPerfumeTypes] = useState([]);
    const [fragrances, setFragrances] = useState([]);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    };

    useEffect(() => {
        // Tải danh sách PerfumeType
        fetch('http://localhost:8080/perfume-types', { headers: getHeaders() })
            .then((res) => res.json())
            .then((data) => setPerfumeTypes(Array.isArray(data) ? data : data.content || []))
            .catch((err) => console.error(err));

        // Tải danh sách Fragrance (Hương thơm)
        fetch('http://localhost:8080/fragrances', { headers: getHeaders() })
            .then((res) => res.json())
            .then((data) => setFragrances(Array.isArray(data) ? data : data.content || []))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim() || !price || !perfumeTypeId) {
            setError('Vui lòng nhập đầy đủ tên, giá và loại nước hoa.');
            return;
        }

        // Cấu trúc payload kết hợp Perfume và PerfumeDetail
        const payload = {
            name: name.trim(),
            price: Number(price),
            perfumeType: {
                perfumeTypeId: Number(perfumeTypeId)
            },
            perfumeDetail: {
                name: detailName.trim() || name.trim(),
                brand: brand.trim(),
                gender: gender,
                volume: volume ? Number(volume) : null,
                concentration: concentration,
                description: description.trim(),
                fragrance: fragranceId ? { fragranceId: Number(fragranceId) } : null
            }
        };

        try {
            setSaving(true);
            setError('');

            const response = await fetch('http://localhost:8080/perfumes', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            alert('Thêm nước hoa thành công.');
            onSuccess();
        } catch (err) {
            setError(err.message || 'Không thể lưu nước hoa.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="customer-modal" style={{ position: 'relative', margin: '20px auto', maxWidth: '650px' }}>
            <h2>Thêm nước hoa mới</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                    <div>
                        <label htmlFor="name">Tên nước hoa *</label>
                        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="price">Giá (VNĐ) *</label>
                        <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="perfumeTypeId">Loại nước hoa *</label>
                        <select id="perfumeTypeId" value={perfumeTypeId} onChange={(e) => setPerfumeTypeId(e.target.value)} required>
                            <option value="">-- Chọn loại nước hoa --</option>
                            {perfumeTypes.map((type) => (
                                <option key={type.perfumeTypeId || type.id} value={type.perfumeTypeId || type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="brand">Thương hiệu (Brand)</label>
                        <input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Ví dụ: Chanel, Dior..." />
                    </div>

                    <div>
                        <label htmlFor="gender">Giới tính</label>
                        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="volume">Dung tích (ml)</label>
                        <input id="volume" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="100" />
                    </div>

                    <div>
                        <label htmlFor="concentration">Nồng độ</label>
                        <select id="concentration" value={concentration} onChange={(e) => setConcentration(e.target.value)}>
                            <option value="EDP">Eau de Parfum (EDP)</option>
                            <option value="EDT">Eau de Toilette (EDT)</option>
                            <option value="Parfum">Parfum</option>
                            <option value="EDC">Eau de Cologne (EDC)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fragranceId">Nhóm hương (Fragrance)</label>
                        <select id="fragranceId" value={fragranceId} onChange={(e) => setFragranceId(e.target.value)}>
                            <option value="">-- Chọn nhóm hương --</option>
                            {fragrances.map((f) => (
                                <option key={f.fragranceId || f.id} value={f.fragranceId || f.id}>
                                    {f.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ textAlign: 'left', marginTop: '12px' }}>
                    <label htmlFor="description">Mô tả chi tiết</label>
                    <textarea
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả sản phẩm..."
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                </div>

                <div className="customer-modal-actions" style={{ marginTop: '16px' }}>
                    <button type="submit" disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Thêm mới'}
                    </button>
                    <button type="button" onClick={onBack} disabled={saving}>
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
}