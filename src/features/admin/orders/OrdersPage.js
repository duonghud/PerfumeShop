import React from 'react';
import { PageHeader, Panel, EmptyState } from '../components/AdminUI';
export default function OrdersPage(){return <><PageHeader><div><h1>Quản lý đơn hàng</h1><p>Theo dõi đơn hàng và cập nhật trạng thái giao hàng.</p></div></PageHeader><Panel><EmptyState>Dữ liệu đơn hàng chưa được kết nối. Hãy nối component này với API đơn hàng của dự án để hiển thị, tìm kiếm và cập nhật trạng thái.</EmptyState></Panel></>}
