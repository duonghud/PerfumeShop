import React from 'react';
import { PageHeader, Panel, EmptyState } from '../components/AdminUI';
export default function FragrancePage(){return <><PageHeader><div><h1>Hương nước hoa</h1><p>Quản lý nhóm hương và thông tin phân loại nước hoa.</p></div></PageHeader><Panel><EmptyState>Chưa có dữ liệu nhóm hương được kết nối. Kết nối API backend để quản lý danh mục này.</EmptyState></Panel></>}
