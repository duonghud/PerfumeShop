import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

// Import các component con
import ImageToolbar from './ImageToolbar';
import ImageTable from './ImageTable';

const initialForm = {
    perfumeId: '',
};

export default function ImagesPage() {
    const [images, setImages] = useState([]);
    const [perfumes, setPerfumes] = useState([]); // Lưu danh sách nước hoa cho dropdown
    const [selectedFile, setSelectedFile] = useState(null); // Lưu file ảnh người dùng chọn từ máy

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(initialForm);

    // Headers thông thường cho GET và DELETE (có JSON)
    const getHeaders = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    // Headers dành riêng cho Upload File (Không set Content-Type để browser tự nhận FormData)
    const getUploadHeaders = () => {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    // 1. Tải danh sách hình ảnh
    const loadImages = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/images', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) throw new Error('Không thể tải danh sách hình ảnh.');

            const data = await response.json();
            if (Array.isArray(data)) setImages(data);
            else if (data && Array.isArray(data.content)) setImages(data.content);
            else if (data && Array.isArray(data.data)) setImages(data.data);
            else setImages([]);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 2. Tải danh sách nước hoa để đổ vào ô chọn (Dropdown)
    const loadPerfumes = async () => {
        try {
            const response = await fetch('http://localhost:8080/perfumes', {
                method: 'GET',
                headers: getHeaders(),
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) setPerfumes(data);
                else if (data && Array.isArray(data.content)) setPerfumes(data.content);
                else if (data && Array.isArray(data.data)) setPerfumes(data.data);
            }
        } catch (err) {
            console.error('Không thể tải danh sách nước hoa:', err);
        }
    };

    useEffect(() => {
        loadImages();
        loadPerfumes();
    }, []);

    // Tìm kiếm ảnh
    const filteredImages = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return images;

        return images.filter((img) => {
            const imgId = String(img.imageId || img.id || '');
            const imgName = String(img.name || '').toLowerCase();
            const perfumeId = String(img.perfume?.perfumeId || img.perfume?.id || img.perfumeId || '');
            return imgId.includes(value) || imgName.includes(value) || perfumeId.includes(value);
        });
    }, [images, keyword]);

    const openCreateForm = () => {
        setForm(initialForm);
        setSelectedFile(null);
        setShowForm(true);
        setError('');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // Bắt sự kiện khi người dùng chọn file từ máy tính
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    // 3. Gửi dữ liệu lên Backend bằng FormData (POST /images)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Vui lòng chọn một file ảnh từ máy tính.');
            return;
        }

        if (!form.perfumeId) {
            setError('Vui lòng chọn loại nước hoa.');
            return;
        }

        // Đóng gói file và thông tin vào FormData
        const formData = new FormData();
        formData.append('file', selectedFile); // Tên field 'file' cần khớp với @RequestParam("file") bên Spring Boot Controller
        formData.append('perfumeId', form.perfumeId); // Truyền kèm ID nước hoa

        try {
            setSaving(true);
            setError('');

            const response = await fetch('http://localhost:8080/images', {
                method: 'POST',
                headers: getUploadHeaders(), // Dùng headers đặc biệt cho FormData
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Lỗi tải lên! Trạng thái: ${response.status}`);
            }

            alert('Tải lên hình ảnh thành công.');
            setShowForm(false);
            setForm(initialForm);
            setSelectedFile(null);
            await loadImages();
        } catch (err) {
            setError(err.message || 'Không thể lưu hình ảnh.');
        } finally {
            setSaving(false);
        }
    };

    // 4. Xóa hình ảnh
    const handleDelete = async (image) => {
        const imageId = image.imageId || image.id;
        const confirmed = window.confirm(`Bạn có chắc muốn xóa hình ảnh "${image.name}" không?`);

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/images/${imageId}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) throw new Error('Không thể xóa hình ảnh.');

            setImages((previous) => previous.filter((item) => (item.imageId || item.id) !== imageId));
            alert('Xóa hình ảnh thành công.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý hình ảnh</h1>
                    <p>Tải lên và quản lý hình ảnh nước hoa từ máy tính.</p>
                </div>
            </PageHeader>

            <Panel>
                <ImageToolbar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onOpenCreate={openCreateForm}
                />

                {error && !showForm && (
                    <p role="alert" className="customer-error" style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                {loading ? (
                    <p>Đang tải danh sách hình ảnh...</p>
                ) : (
                    <PaginatedList items={filteredImages}>
                        {(pageImages) => (
                            <ImageTable
                                images={pageImages}
                                onDelete={handleDelete}
                            />
                        )}
                    </PaginatedList>
                )}
            </Panel>
        </>
    );
}