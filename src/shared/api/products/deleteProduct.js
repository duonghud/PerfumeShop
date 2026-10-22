import { apiRequest } from '../api';

export function deleteProduct(id) {
  return apiRequest(`/perfumes/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
