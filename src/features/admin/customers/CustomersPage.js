import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel } from '../components/AdminUI';
import {
getCustomers,
createCustomer,
updateCustomer,
deleteCustomer,
} from '../../../shared/api/customerApi';
import './../pages/CustomersPage.css';

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

const [showForm, setShowForm] = useState(false);
const [editingId, setEditingId] = useState(null);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [form, setForm] = useState(initialForm);

const loadCustomers = async () => {
    try {
        setError('');

        const data = await getCustomers();

        console.log('Kiểu dữ liệu:', typeof data);
        console.log('Có phải mảng không:', Array.isArray(data));
        console.log('Danh sách nhận được:', data);

        // API trả về trực tiếp một mảng JSON
        if (Array.isArray(data)) {
            setCustomers(data);
        } else {
            setCustomers([]);
            setError('Dữ liệu API không có định dạng mảng.');
        }
    } catch (err) {
        console.error('Lỗi tải khách hàng:', err);
        setError(err.message || 'Không thể tải danh sách khách hàng.');
    } finally {
        setLoading(false);
    }
};

const filteredCustomers = useMemo(() => {
    const value = keyword.trim().toLowerCase();

    if (!value) return customers;

    return customers.filter((customer) =>
        [
            customer.fullName,
            customer.phone,
            customer.email,
            customer.customerId,
        ].some((item) =>
            String(item ?? '').toLowerCase().includes(value)
        )
    );
}, [customers, keyword]);

const openCreateForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
    setError('');
};

const openEditForm = (customer) => {
    setEditingId(customer.customerId);
    setForm({
        fullName: customer.fullName ?? '',
        phone: customer.phone ?? '',
        email: customer.email ?? '',
        password: '',
    });
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

const handleSubmit = async (event) => {
    event.preventDefault();

    if (
        !form.fullName.trim() ||
        !form.phone.trim() ||
        !form.email.trim()
    ) {
        setError('Vui lòng nhập đầy đủ họ tên, số điện thoại và email.');
        return;
    }

    if (!editingId && !form.password.trim()) {
        setError('Vui lòng nhập mật khẩu cho khách hàng mới.');
        return;
    }

    const payload = {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
    };

    // Khi tạo mới, gửi mật khẩu để backend mã hóa và lưu.
    if (!editingId || form.password.trim()) {
        payload.password = form.password;
    }

    try {
        setSaving(true);
        setError('');

        if (editingId) {
            await updateCustomer(editingId, payload);
            alert('Cập nhật khách hàng thành công.');
        } else {
            await createCustomer(payload);
            alert('Thêm khách hàng thành công.');
        }

        setShowForm(false);
        setForm(initialForm);
        setEditingId(null);

        await loadCustomers();
    } catch (err) {
        setError(err.message || 'Không thể lưu khách hàng.');
    } finally {
        setSaving(false);
    }
};

const handleDelete = async (customer) => {
    const confirmed = window.confirm(
        `Bạn có chắc muốn xóa khách hàng "${customer.fullName}" không?`
    );

    if (!confirmed) return;

    try {
        setError('');
        await deleteCustomer(customer.customerId);
        setCustomers((previous) =>
            previous.filter(
                (item) => item.customerId !== customer.customerId
            )
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
                <p>Xem thông tin và lịch sử mua hàng của khách hàng.</p>
            </div>
        </PageHeader>

        <Panel>
            <div className="customer-toolbar">
                <input
                    type="search"
                    placeholder="Tìm theo tên, số điện thoại, email..."
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    aria-label="Tìm kiếm khách hàng"
                />

                <button type="button" onClick={openCreateForm}>
                    + Thêm khách hàng
                </button>
            </div>

            {error && (
                <p role="alert" className="customer-error">
                    {error}
                </p>
            )}

            {loading ? (
                <p>Đang tải danh sách khách hàng...</p>
            ) : (
                <div className="customer-table-wrapper">
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <div className="customer-actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCustomer(customer)
                                                }
                                            >
                                                Chi tiết
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditForm(customer)
                                                }
                                            >
                                                Sửa
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(customer)
                                                }
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan="5">
                                        Không tìm thấy khách hàng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </Panel>

        {showForm && (
            <div className="customer-modal-backdrop">
                <div
                    className="customer-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="customer-form-title"
                >
                    <h2 id="customer-form-title">
                        {editingId
                            ? 'Cập nhật khách hàng'
                            : 'Thêm khách hàng'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullName">Họ và tên</label>
                        <input
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">
                            Mật khẩu
                            {editingId
                                ? ' (để trống nếu không đổi)'
                                : ''}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required={!editingId}
                            autoComplete="new-password"
                        />

                        <p className="customer-password-note">
                            Không hiển thị mật khẩu đã lưu. Backend cần mã
                            hóa mật khẩu trước khi lưu vào cơ sở dữ liệu.
                        </p>

                        <div className="customer-modal-actions">
                            <button type="submit" disabled={saving}>
                                {saving
                                    ? 'Đang lưu...'
                                    : editingId
                                        ? 'Lưu thay đổi'
                                        : 'Thêm khách hàng'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setError('');
                                }}
                                disabled={saving}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {selectedCustomer && (
            <div className="customer-modal-backdrop">
                <div
                    className="customer-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="customer-detail-title"
                >
                    <h2 id="customer-detail-title">
                        Chi tiết khách hàng
                    </h2>

                    <p>
                        <strong>ID:</strong>{' '}
                        {selectedCustomer.customerId}
                    </p>
                    <p>
                        <strong>Họ tên:</strong>{' '}
                        {selectedCustomer.fullName}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong>{' '}
                        {selectedCustomer.phone}
                    </p>
                    <p>
                        <strong>Email:</strong>{' '}
                        {selectedCustomer.email}
                    </p>

                    <button
                        type="button"
                        onClick={() => setSelectedCustomer(null)}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        )}
    </>
);

}
