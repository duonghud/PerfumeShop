import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

// Import các component con đã tách
import CustomerToolbar from './CustomerToolbar';
import CustomerTable from './CustomerTable';
import CustomerCreateModal from './CustomerCreateModal';
import CustomerEditModal from './CustomerEditModal';

import './CustomersPage.css';

const initialForm = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [form, setForm] = useState(initialForm);

    // Hàm tạo headers chung (có đính kèm token nếu đã đăng nhập)
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

    // 1. Lấy danh sách khách hàng (GET)
    const loadCustomers = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/customers', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setCustomers(data);
            } else if (data && Array.isArray(data.content)) {
                setCustomers(data.content);
            } else if (data && Array.isArray(data.data)) {
                setCustomers(data.data);
            } else {
                setCustomers([]);
                setError('Dữ liệu API trả về không đúng định dạng mảng.');
            }
        } catch (err) {
            console.error('Lỗi tải khách hàng:', err);
            setError(err.message || 'Không thể tải danh sách khách hàng.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Tìm kiếm khách hàng theo từ khóa
    const filteredCustomers = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return customers;

        return customers.filter((customer) =>
            [
                customer.fullName,
                customer.phone,
                customer.email,
                customer.customerId || customer.id,
            ].some((item) =>
                String(item ?? '').toLowerCase().includes(value)
            )
        );
    }, [customers, keyword]);

    const openCreateForm = () => {
        setForm(initialForm);
        setShowCreateModal(true);
        setError('');
    };

    const openEditForm = (customer) => {
        const id = customer.customerId || customer.id;
        setEditingId(id);
        setForm({
            fullName: customer.fullName ?? '',
            phone: customer.phone ?? '',
            email: customer.email ?? '',
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

    // 2. Thêm mới hoặc Cập nhật khách hàng (POST / PUT)
    const handleSubmit = async (event) => {
        event.preventDefault();

        const fullName = form?.fullName ?? '';
        const phone = form?.phone ?? '';
        const email = form?.email ?? '';

        if (!fullName.trim() || !phone.trim() || !email.trim()) {
            setError('Vui lòng nhập đầy đủ họ tên, số điện thoại và email.');
            return;
        }

        const payload = {
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim(),
        };

        if (!editingId) {
            const password = form?.password ?? '';
            if (!password.trim()) {
                setError('Vui lòng nhập mật khẩu cho khách hàng mới.');
                return;
            }
            payload.password = password;
        }

        try {
            setSaving(true);
            setError('');

            const url = editingId
                ? `http://localhost:8080/customers/update/${editingId}`
                : 'http://localhost:8080/customers/create';
            
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
                alert('Cập nhật khách hàng thành công.');
                setShowEditModal(false);
            } else {
                alert('Thêm khách hàng thành công.');
                setShowCreateModal(false);
            }

            setForm(initialForm);
            setEditingId(null);
            await loadCustomers();
        } catch (err) {
            setError(err.message || 'Không thể lưu khách hàng.');
        } finally {
            setSaving(false);
        }
    };

    // 3. Xóa khách hàng (DELETE)
    const handleDelete = async (customer) => {
        const customerId = customer.customerId || customer.id;
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa khách hàng "${customer.fullName}" không?`
        );

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/customers/${customerId}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            setCustomers((previous) =>
                previous.filter((item) => (item.customerId || item.id) !== customerId)
            );
            alert('Xóa khách hàng thành công.');
        } catch (err) {
            setError(err.message || 'Không thể xóa khách hàng.');
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý khách hàng</h1>
                    <p>Xem thông tin và quản lý tài khoản khách hàng.</p>
                </div>
            </PageHeader>

            <Panel>
                <CustomerToolbar
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
                    <p>Đang tải danh sách khách hàng...</p>
                ) : (
                    <PaginatedList items={filteredCustomers}>
                        {(pageCustomers) => (
                            <CustomerTable
                                customers={pageCustomers}
                                onDetail={(customer) => setSelectedCustomer(customer)}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                            />
                        )}
                    </PaginatedList>
                )}
            </Panel>

            {showCreateModal && (
                <CustomerCreateModal
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
                <CustomerEditModal
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