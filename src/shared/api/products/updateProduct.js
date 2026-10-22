import { apiRequest } from '../api';

export function updateProduct(id, product) {
  return apiRequest(`/perfumes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}
