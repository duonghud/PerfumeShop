import { apiRequest } from '../api';
import { normalizeProduct } from './normalizeProduct';

export async function getProduct(id) {
  const data = await apiRequest(`/perfumes/${encodeURIComponent(id)}`);
  return normalizeProduct(data?.data || data?.perfume || data);
}
