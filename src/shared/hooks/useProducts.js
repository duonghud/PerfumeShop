import { useEffect, useState } from 'react';
import { getProducts } from '../api/products/getProducts';

export default function useProducts() {
  const [products, setProducts] = useState([]);
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
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { products, loading, apiError };
}
