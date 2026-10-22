import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

// Import các component con
import PerfumeTypeToolbar from './PerfumeTypeToolbar';
import PerfumeTypeTable from './PerfumeTypeTable';
import PerfumeTypeCreateModal from './PerfumeTypeCreateModal';
import PerfumeTypeEditModal from './PerfumeTypeEditModal';
import PerfumeTypeDetailModal from './PerfumeTypeDetailModal';

const initialForm = {
    name: '',
    description: '',
};

export default function PerfumeTypesPage() {
    const [perfumeTypes, setPerfumeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedPerfumeType, setSelectedPerfumeType] = useState(null);
    const [form, setForm] = useState(initialForm);

    // Hàm tạo headers chung có kèm Token từ localStorage
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

    // 1. Tải danh sách loại nước hoa (GET /perfume-types)
    const loadPerfumeTypes = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/perfume_types', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setPerfumeTypes(data);
            } else if (data && Array.isArray(data.content)) {
                setPerfumeTypes(data.content);
            } else if (data && Array.isArray(data.data)) {
                setPerfumeTypes(data.data);
            } else {
                setPerfumeTypes([]);
                setError('Dữ liệu API trả về không đúng định dạng mảng.');
            }
        } catch (err) {
            console.error('Lỗi tải loại nước hoa:', err);
            setError(err.message || 'Không thể tải danh sách loại nước hoa.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPerfumeTypes();
    }, []);

    // 2. Tìm kiếm theo từ khóa
    const filteredPerfumeTypes = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return perfumeTypes;

        return perfumeTypes.filter((item) =>
            [
                item.name,
                item.description,
                item.perfumeTypeId || item.id,
            ].some((val) =>
                String(val ?? '').toLowerCase().includes(value)
            )
        );
    }, [perfumeTypes, keyword]);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(initialForm);
        setShowCreateModal(true);
        setError('');
    };

    const openEditForm = (item) => {
        const id = item.perfumeTypeId || item.id;
        setEditingId(id);
        setForm({
            name: item.name ?? '',
            description: item.description ?? '',
        });
        setShowEditModal(true);
        setError('');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const submitForm = async (event, { url, method, successMessage, closeModal }) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setError('Vui lòng nhập tên loại nước hoa.');
            return;
        }

        const payload = {
            name: form.name.trim(),
            description: form.description.trim(),
        };

        try {
            setSaving(true);
            setError('');

            const response = await fetch(url, {
                method: method,
                headers: getHeaders(),
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            alert(successMessage);
            closeModal();
            setForm(initialForm);
            setEditingId(null);
            await loadPerfumeTypes();
        } catch (err) {
            setError(err.message || 'Không thể lưu loại nước hoa.');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateSubmit = (event) => submitForm(event, {
        url: 'http://localhost:8080/perfume_types/create',
        method: 'POST',
        successMessage: 'Thêm loại nước hoa thành công.',
        closeModal: () => setShowCreateModal(false),
    });
    const handleEditSubmit = (event) => submitForm(event, {
        url: `http://localhost:8080/perfume_types/${editingId}`,
        method: 'PUT',
        successMessage: 'Cập nhật loại nước hoa thành công.',
        closeModal: () => setShowEditModal(false),
    });

    // 4. Xóa loại nước hoa (DELETE /perfume-types/{id})
    const handleDelete = async (item) => {
        const id = item.perfumeTypeId || item.id;
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa loại nước hoa "${item.name}" không?`
        );

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/perfume-types/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            setPerfumeTypes((previous) =>
                previous.filter((el) => (el.perfumeTypeId || el.id) !== id)
            );
            alert('Xóa loại nước hoa thành công.');
        } catch (err) {
            setError(err.message || 'Không thể xóa loại nước hoa.');
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý loại nước hoa (Perfume Type)</h1>
                    <p>Quản lý các danh mục phân loại nước hoa trong cửa hàng.</p>
                </div>
            </PageHeader>

            <Panel>
                <PerfumeTypeToolbar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onOpenCreate={openCreateForm}
                />

                {error && !showCreateModal && !showEditModal && (
                    <p role="alert" className="customer-error" style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                {loading ? (
                    <p>Đang tải danh sách loại nước hoa...</p>
                ) : (
                    <PaginatedList items={filteredPerfumeTypes}>
                        {(pagePerfumeTypes) => (
                            <PerfumeTypeTable
                                perfumeTypes={pagePerfumeTypes}
                                onDetail={(item) => setSelectedPerfumeType(item)}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                            />
                        )}
                    </PaginatedList>
                )}
            </Panel>

            {showCreateModal && (
                <PerfumeTypeCreateModal
                    form={form}
                    error={error}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleCreateSubmit}
                    onClose={() => {
                        setShowCreateModal(false);
                        setError('');
                    }}
                />
            )}

            {showEditModal && (
                <PerfumeTypeEditModal
                    form={form}
                    error={error}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleEditSubmit}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingId(null);
                        setError('');
                    }}
                />
            )}

            <PerfumeTypeDetailModal
                perfumeType={selectedPerfumeType}
                onClose={() => setSelectedPerfumeType(null)}
            />
        </>
    );
}