import { apiRequest } from '../api';
import { normalizeProduct, unwrapProducts } from './normalizeProduct';

export async function getProducts() {
  const data = await apiRequest('/perfumes');
  return unwrapProducts(data).map(normalizeProduct);
}
