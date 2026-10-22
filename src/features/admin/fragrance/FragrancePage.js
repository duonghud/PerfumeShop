import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

import FragranceToolbar from './FragranceToolbar';
import FragranceTable from './FragranceTable';
import FragranceCreateModal from './FragranceCreateModal';
import FragranceEditModal from './FragranceEditModal';

const initialForm = {
    name: '',
    description: '',
};

export default function FragrancePage() {
    const [fragrances, setFragrances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedFragrance, setSelectedFragrance] = useState(null);
    const [form, setForm] = useState(initialForm);

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

    // 1. Tải danh sách hương thơm (GET /fragrances)
    const loadFragrances = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/fragrances', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setFragrances(data);
            } else if (data && Array.isArray(data.content)) {
                setFragrances(data.content);
            } else if (data && Array.isArray(data.data)) {
                setFragrances(data.data);
            } else {
                setFragrances([]);
                setError('Dữ liệu API trả về không đúng định dạng mảng.');
            }
        } catch (err) {
            console.error('Lỗi tải hương thơm:', err);
            setError(err.message || 'Không thể tải danh sách hương thơm.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFragrances();
    }, []);

    // 2. Tìm kiếm hương thơm theo từ khóa
    const filteredFragrances = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return fragrances;

        return fragrances.filter((item) =>
            [
                item.name,
                item.description,
                item.fragranceId || item.id,
            ].some((val) =>
                String(val ?? '').toLowerCase().includes(value)
            )
        );
    }, [fragrances, keyword]);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(initialForm);
        setShowCreateModal(true);
        setError('');
    };

    const openEditForm = (item) => {
        const id = item.fragranceId || item.id;
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
            setError('Vui lòng nhập tên hương thơm.');
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
            await loadFragrances();
        } catch (err) {
            setError(err.message || 'Không thể lưu hương thơm.');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateSubmit = (event) => submitForm(event, {
        url: 'http://localhost:8080/fragrances/create',
        method: 'POST',
        successMessage: 'Thêm hương thơm thành công.',
        closeModal: () => setShowCreateModal(false),
    });
    const handleEditSubmit = (event) => submitForm(event, {
        url: `http://localhost:8080/fragrances/${editingId}`,
        method: 'PUT',
        successMessage: 'Cập nhật hương thơm thành công.',
        closeModal: () => setShowEditModal(false),
    });

    // 4. Xóa hương thơm (DELETE /fragrances/{id})
    const handleDelete = async (item) => {
        const id = item.fragranceId || item.id;
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa hương thơm "${item.name}" không?`
        );

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/fragrances/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            setFragrances((previous) =>
                previous.filter((el) => (el.fragranceId || el.id) !== id)
            );
            alert('Xóa hương thơm thành công.');
        } catch (err) {
            setError(err.message || 'Không thể xóa hương thơm.');
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý hương thơm (Fragrance)</h1>
                    <p>Quản lý các nhóm hương và mô tả chi tiết cho hệ thống nước hoa.</p>
                </div>
            </PageHeader>

            <Panel>
                <FragranceToolbar
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
                    <p>Đang tải danh sách hương thơm...</p>
                ) : (
                    <PaginatedList items={filteredFragrances}>
                        {(pageFragrances) => (
                            <FragranceTable
                                fragrances={pageFragrances}
                                onDetail={(item) => setSelectedFragrance(item)}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                            />
                        )}
                    </PaginatedList>
                )}
            </Panel>

            {showCreateModal && (
                <FragranceCreateModal
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
                <FragranceEditModal
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
        </>
    );
}