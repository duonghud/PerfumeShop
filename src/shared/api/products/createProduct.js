import { apiRequest } from '../api';

export function createProduct(product) {
  return apiRequest('/perfumes', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}
