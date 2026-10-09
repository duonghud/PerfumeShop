import React from 'react';
import { BarChartFill, CartFill, BoxSeam, PeopleFill } from 'react-bootstrap-icons';
import { PageHeader, Grid, Stat, Panel, Muted } from '../components/AdminUI';
export default function DashboardPage(){return <>
  <PageHeader><div><h1>Tổng quan</h1><p>Tổng quan nhanh về hoạt động cửa hàng SynPe.</p></div></PageHeader>
  <Grid>
    <Stat><span><CartFill className="symbol"/> Đơn hàng</span><strong>—</strong><Muted>Kết nối API để tải dữ liệu</Muted></Stat>
    <Stat><span><BoxSeam className="symbol"/> Sản phẩm</span><strong>—</strong><Muted>Chưa có thống kê từ backend</Muted></Stat>
    <Stat><span><PeopleFill className="symbol"/> Khách hàng</span><strong>—</strong><Muted>Chưa có thống kê từ backend</Muted></Stat>
    <Stat><span><BarChartFill className="symbol"/> Doanh thu</span><strong>—</strong><Muted>Chưa có thống kê từ backend</Muted></Stat>
  </Grid>
  <Panel><h3>Chào mừng đến trang quản trị</h3><p>Chọn một chức năng ở thanh menu để quản lý từng nhóm dữ liệu.</p></Panel>
</>}
