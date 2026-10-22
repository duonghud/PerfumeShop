import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

// Import các component con
import AdminToolbar from './AdminToolbar';
import AdminTable from './AdminTable';
import AdminCreateModal from './AdminCreateModal';
import AdminEditModal from './AdminEditModal';

const initialForm = {
    fullName: '',
    email: '',
    password: '',
};

export default function AdminsPage() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
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

    // 1. Tải danh sách quản trị viên (GET /admins)
    const loadAdmins = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/admins', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setAdmins(data);
            } else if (data && Array.isArray(data.content)) {
                setAdmins(data.content);
            } else if (data && Array.isArray(data.data)) {
                setAdmins(data.data);
            } else {
                setAdmins([]);
                setError('Dữ liệu API trả về không đúng định dạng mảng.');
            }
        } catch (err) {
            console.error('Lỗi tải quản trị viên:', err);
            setError(err.message || 'Không thể tải danh sách quản trị viên.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    // 2. Tìm kiếm quản trị viên theo từ khóa
    const filteredAdmins = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return admins;

        return admins.filter((item) =>
            [
                item.fullName,
                item.email,
                item.adminId || item.id,
            ].some((val) =>
                String(val ?? '').toLowerCase().includes(value)
            )
        );
    }, [admins, keyword]);

    const openCreateForm = () => {
        setForm(initialForm);
        setShowCreateModal(true);
        setError('');
    };

    const openEditForm = (item) => {
        const id = item.adminId || item.id;
        setEditingId(id);
        setForm({
            fullName: item.fullName ?? '',
            email: item.email ?? '',
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

    // 3. Thêm mới hoặc Cập nhật quản trị viên (POST / PUT)
    const handleSubmit = async (event) => {
        event.preventDefault();

        const fullName = form?.fullName ?? '';
        const email = form?.email ?? '';

        if (!fullName.trim() || !email.trim()) {
            setError('Vui lòng nhập đầy đủ họ tên và email.');
            return;
        }

        const payload = {
            fullName: fullName.trim(),
            email: email.trim(),
        };

        // Chỉ kiểm tra và gửi password nếu là THÊM MỚI (!editingId)
        if (!editingId) {
            const password = form?.password ?? '';
            if (!password.trim()) {
                setError('Vui lòng nhập mật khẩu cho quản trị viên mới.');
                return;
            }
            payload.password = password;
        }

        try {
            setSaving(true);
            setError('');

            const url = editingId
                ? `http://localhost:8080/admins/update/${editingId}`
                : 'http://localhost:8080/admins/create';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: getHeaders(),
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            if (editingId) {
                alert('Cập nhật quản trị viên thành công.');
                setShowEditModal(false);
            } else {
                alert('Thêm quản trị viên thành công.');
                setShowCreateModal(false);
            }

            setForm(initialForm);
            setEditingId(null);
            await loadAdmins();
        } catch (err) {
            setError(err.message || 'Không thể lưu quản trị viên.');
        } finally {
            setSaving(false);
        }
    };

    // 4. Xóa quản trị viên (DELETE /admins/{id})
    const handleDelete = async (item) => {
        const id = item.adminId || item.id;
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa quản trị viên "${item.fullName}" không?`
        );

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/admins/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            setAdmins((previous) =>
                previous.filter((el) => (el.adminId || el.id) !== id)
            );
            alert('Xóa quản trị viên thành công.');
        } catch (err) {
            setError(err.message || 'Không thể xóa quản trị viên.');
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý Quản trị viên (Admin)</h1>
                    <p>Quản lý tài khoản và thông tin các quản trị viên hệ thống.</p>
                </div>
            </PageHeader>

            <Panel>
                <AdminToolbar
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
                    <p>Đang tải danh sách quản trị viên...</p>
                ) : (
                    <PaginatedList items={filteredAdmins}>
                        {(pageAdmins) => (
                            <AdminTable
                                admins={pageAdmins}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                            />
                        )}
                    </PaginatedList>
                )}
            </Panel>

            {showCreateModal && (
                <AdminCreateModal
                    form={form}
                    error={error}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        setShowCreateModal(false);
                        setError('');
                    }}
                />
            )}

            {showEditModal && (
                <AdminEditModal
                    form={form}
                    error={error}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
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