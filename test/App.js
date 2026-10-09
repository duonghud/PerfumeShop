import './App.css';
import { Header, Footer, Cart } from './components';
import AuthModal from './components/AuthModal';
import Product from './Product';
import { ProductDetail } from './Product';
import Contact from './components/Contact';
import About from './pages/About';
import HomePage from './pages/HomePage';
import Checkout from './pages/Checkout';
import AdminPage from './pages/AdminPage';
import OrderHistory from './pages/OrderHistory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

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
