import { useEffect, useState } from 'react';
import mockProducts from '../data/products';
import { getProducts, normalizeProduct } from '../api/api';

// Ưu tiên dữ liệu backend; nếu backend chưa chạy, vẫn hiển thị dữ liệu mẫu để phát triển giao diện.
export default function useProducts() {
  const [products, setProducts] = useState(mockProducts.map(normalizeProduct));
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (!active) return;
        setProducts(data);
        setApiError('');
      })
      .catch((error) => {
        if (!active) return;
        setApiError(error.message);
        // Fallback chỉ để xem giao diện; dữ liệu mẫu không được gửi lên backend.
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { products, loading, apiError };
}
