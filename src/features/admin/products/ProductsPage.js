import React, { useMemo, useState } from 'react';
import products from '../../../shared/data/products';
import { PageHeader, Panel, TableWrap, SearchInput, Muted } from '../components/AdminUI';
const money = value => new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(Number(value)||0);
export default function ProductsPage(){const [search,setSearch]=useState('');const rows=useMemo(()=>products.filter(p=>`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(search.toLowerCase())),[search]);return <>
<PageHeader><div><h1>Quản lý sản phẩm</h1><p>Danh sách sản phẩm mẫu hiện có trong dự án.</p></div><SearchInput value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm tên, thương hiệu..." /></PageHeader>
<Panel><p><Muted>{rows.length} sản phẩm trong dữ liệu mẫu. Chức năng thêm/sửa/xóa cần kết nối API backend.</Muted></p><TableWrap><table><thead><tr><th>ID</th><th>Sản phẩm</th><th>Thương hiệu</th><th>Danh mục</th><th>Giá</th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.brand}</td><td>{p.category}</td><td>{money(p.discount || p.price)}</td></tr>)}</tbody></table></TableWrap></Panel>
</>}
