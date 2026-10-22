import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      <Header />
      <main className="customer-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}