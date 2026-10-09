import './App.css';
import { Header, Footer, Cart } from './features/customer/components/index';
import AuthModal from './features/customer/components/AuthModal';
import Product from './features/customer/products/index';
import { ProductDetail } from './features/customer/products/index';
import Contact from './features/customer/components/Contact';
import About from './features/customer/pages/About';
import HomePage from './features/customer/pages/HomePage';
import Checkout from './features/customer/pages/Checkout';
import AdminPage from './features/admin/pages/AdminPage';
import OrderHistory from './features/customer/pages/OrderHistory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './shared/context/CartContext';
import { AuthProvider } from './shared/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Cart />
            <AuthModal />
            <div className="main-content">
              <Routes>
                <Route path="/"             element={<HomePage />} />
                <Route path="/shop"         element={<Product />} />
                <Route path="/product/:id"  element={<ProductDetail />} />
                <Route path="/contact"      element={<Contact />} />
                <Route path="/about"        element={<About />} />
                <Route path="/checkout"     element={<Checkout />} />
                <Route path="/admin"        element={<AdminPage />} />
                <Route path="/orders"       element={<OrderHistory />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
