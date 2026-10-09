import React from 'react';
import { PageHeader, Panel, EmptyState } from '../components/AdminUI';
export default function PaymentMethodsPage(){return <><PageHeader><div><h1>Phương thức thanh toán</h1><p>Quản lý các phương thức thanh toán được cửa hàng hỗ trợ.</p></div></PageHeader><Panel><EmptyState>Chưa có API phương thức thanh toán trong màn hình này. Kết nối backend để thêm, sửa hoặc bật/tắt phương thức.</EmptyState></Panel></>}
