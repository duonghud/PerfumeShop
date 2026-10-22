import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

// Import các component con đã tách
import PaymentMethodToolbar from './PaymentMethodToolbar';
import PaymentMethodTable from './PaymentMethodTable';
import PaymentMethodCreateForm from './PaymentMethodCreateForm';
import PaymentMethodEditForm from './PaymentMethodEditForm';


export default function PaymentMethodsPage() {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    // Quản lý trạng thái hiển thị view: 'list' | 'create' | 'edit'
    const [currentView, setCurrentView] = useState('list');
    const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);

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

    // 1. Tải danh sách phương thức thanh toán (GET /payment-methods)
    const loadPaymentMethods = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/payment_methods', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setPaymentMethods(data);
            } else if (data && Array.isArray(data.content)) {
                setPaymentMethods(data.content);
            } else if (data && Array.isArray(data.data)) {
                setPaymentMethods(data.data);
            } else {
                setPaymentMethods([]);
                setError('Dữ liệu API trả về không đúng định dạng mảng.');
            }
        } catch (err) {
            console.error('Lỗi tải phương thức thanh toán:', err);
            setError(err.message || 'Không thể tải danh sách phương thức thanh toán.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPaymentMethods();
    }, []);

    // 2. Tìm kiếm theo từ khóa
    const filteredPaymentMethods = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return paymentMethods;

        return paymentMethods.filter((item) =>
            [
                item.name,
                item.paymentMethodId || item.id,
            ].some((val) =>
                String(val ?? '').toLowerCase().includes(value)
            )
        );
    }, [paymentMethods, keyword]);

    // 3. Xóa phương thức thanh toán
    const handleDelete = async (item) => {
        const id = item.paymentMethodId || item.id;
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa phương thức thanh toán "${item.name}" không?`
        );

        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/payment_methods/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            setPaymentMethods((previous) =>
                previous.filter((el) => (el.paymentMethodId || el.id) !== id)
            );
            alert('Xóa phương thức thanh toán thành công.');
        } catch (err) {
            setError(err.message || 'Không thể xóa phương thức thanh toán.');
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý Phương thức thanh toán (Payment Method)</h1>
                    <p>Quản lý các hình thức thanh toán trong cửa hàng.</p>
                </div>
            </PageHeader>

            <Panel>
                {/* Hiển thị danh sách (List View) */}
                {currentView === 'list' && (
                    <>
                        <PaymentMethodToolbar
                            keyword={keyword}
                            setKeyword={setKeyword}
                            onOpenCreate={() => setCurrentView('create')}
                        />

                        {error && (
                            <p role="alert" className="customer-error" style={{ color: 'red' }}>
                                {error}
                            </p>
                        )}

                        {loading ? (
                            <p>Đang tải danh sách phương thức thanh toán...</p>
                        ) : (
                            <PaginatedList items={filteredPaymentMethods}>
                                {(pagePaymentMethods) => (
                                    <PaymentMethodTable
                                        paymentMethods={pagePaymentMethods}
                                        onEdit={(item) => {
                                            setEditingPaymentMethod(item);
                                            setCurrentView('edit');
                                        }}
                                        onDelete={handleDelete}
                                    />
                                )}
                            </PaginatedList>
                        )}
                    </>
                )}

                {currentView === 'create' && (
                    <PaymentMethodCreateForm
                        onBack={() => setCurrentView('list')}
                        onSuccess={() => {
                            setCurrentView('list');
                            loadPaymentMethods();
                        }}
                    />
                )}
                {currentView === 'edit' && (
                    <PaymentMethodEditForm
                        paymentMethod={editingPaymentMethod}
                        onBack={() => setCurrentView('list')}
                        onSuccess={() => {
                            setCurrentView('list');
                            loadPaymentMethods();
                        }}
                    />
                )}
            </Panel>
        </>
    );
}