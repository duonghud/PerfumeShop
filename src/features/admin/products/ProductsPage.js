import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader, Panel, PaginatedList } from '../components/AdminUI';

import PerfumeToolbar from './PerfumeToolbar';
import PerfumeTable from './PerfumeTable';
import PerfumeDetailModal from './PerfumeDetailModal';
import PerfumeCreateForm from './PerfumeCreateForm';
import PerfumeEditForm from './PerfumeEditForm';

export default function PerfumesPage() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [keyword, setKeyword] = useState('');

    const [currentView, setCurrentView] = useState('list'); // 'list' | 'create' | 'edit'
    const [selectedPerfume, setSelectedPerfume] = useState(null); // Dành cho View Chi Tiết
    const [editingPerfume, setEditingPerfume] = useState(null);   // Dành cho Form Sửa

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    };

    const loadPerfumes = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8080/perfumes', {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);

            const data = await response.json();
            if (Array.isArray(data)) setPerfumes(data);
            else if (data && Array.isArray(data.content)) setPerfumes(data.content);
            else if (data && Array.isArray(data.data)) setPerfumes(data.data);
            else setPerfumes([]);
        } catch (err) {
            console.error('Lỗi tải danh sách nước hoa:', err);
            setError(err.message || 'Không thể tải danh sách nước hoa.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPerfumes();
    }, []);

    const filteredPerfumes = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) return perfumes;

        return perfumes.filter((item) =>
            [
                item.name,
                item.perfumeId || item.id,
                item.perfumeType?.name,
                item.perfumeDetail?.brand,
                item.perfumeDetail?.gender,
            ].some((val) => String(val ?? '').toLowerCase().includes(value))
        );
    }, [perfumes, keyword]);

    const handleDelete = async (item) => {
        const id = item.perfumeId || item.id;
        const confirmed = window.confirm(`Bạn có chắc muốn xóa nước hoa "${item.name}" không?`);
        if (!confirmed) return;

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/perfumes/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) throw new Error('Không thể xóa nước hoa.');

            setPerfumes((prev) => prev.filter((el) => (el.perfumeId || el.id) !== id));
            alert('Xóa nước hoa thành công.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <PageHeader>
                <div>
                    <h1>Quản lý Nước hoa (Perfume)</h1>
                    <p>Quản lý toàn bộ danh mục sản phẩm và chi tiết thông số nước hoa.</p>
                </div>
            </PageHeader>

            <Panel>
                {currentView === 'list' && (
                    <>
                        <PerfumeToolbar
                            keyword={keyword}
                            setKeyword={setKeyword}
                            onOpenCreate={() => setCurrentView('create')}
                        />

                        {error && <p className="customer-error" style={{ color: 'red' }}>{error}</p>}

                        {loading ? (
                            <p>Đang tải danh sách nước hoa...</p>
                        ) : (
                            <PaginatedList items={filteredPerfumes}>
                                {(pagePerfumes) => (
                                    <PerfumeTable
                                        perfumes={pagePerfumes}
                                        onDetail={(item) => setSelectedPerfume(item)}
                                        onEdit={(item) => {
                                            setEditingPerfume(item);
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
                    <PerfumeCreateForm
                        onBack={() => setCurrentView('list')}
                        onSuccess={() => {
                            setCurrentView('list');
                            loadPerfumes();
                        }}
                    />
                )}

                {currentView === 'edit' && (
                    <PerfumeEditForm
                        perfume={editingPerfume}
                        onBack={() => setCurrentView('list')}
                        onSuccess={() => {
                            setCurrentView('list');
                            loadPerfumes();
                        }}
                    />
                )}
            </Panel>

            {/* Modal xem chi tiết */}
            <PerfumeDetailModal
                perfume={selectedPerfume}
                onClose={() => setSelectedPerfume(null)}
            />
        </>
    );
}