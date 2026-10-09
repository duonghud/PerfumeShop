// Tất cả cấu hình và hàm gọi API tập trung tại đây.
// Có thể đổi URL bằng biến môi trường REACT_APP_API_URL trong file .env.
export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export const getToken = () => localStorage.getItem('synpe_token');

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch (error) {
    throw new Error(`Không kết nối được backend tại ${API_BASE_URL}. Hãy kiểm tra Spring Boot và CORS.`);
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = data && typeof data === 'object'
      ? (data.message || data.error || data.detail)
      : data;
    throw new Error(message || `API lỗi HTTP ${response.status}`);
  }
  return data;
}

// Chuẩn hóa dữ liệu API Spring Boot thành cấu trúc mà giao diện hiện tại đang sử dụng.
export function normalizeProduct(raw = {}) {
  const detail = raw.perfumeDetail || raw.detail || {};
  const images = raw.images || raw.imageList || [];
  const firstImage = Array.isArray(images) ? images[0] : null;
  const imageUrl = typeof firstImage === 'string' ? firstImage :
    (firstImage?.imageUrl || firstImage?.image_url || firstImage?.url);
  const price = Number(raw.price ?? detail.price ?? 0);
  const discount = Number(raw.discountPrice ?? raw.discount ?? raw.salePrice ?? price);
  const type = raw.perfumeType || raw.type || {};

  return {
    ...raw,
    id: Number(raw.id ?? raw.perfumeId ?? raw.perfume_id ?? raw.productId),
    name: raw.name || raw.perfumeName || raw.productName || raw.title || '',
    brand: raw.brand?.name || raw.brandName || raw.brand || raw.manufacturer || 'Chưa phân loại',
    category: raw.category || raw.categoryName || type.name || type.typeName || 'Unisex',
    price,
    discount: Number.isFinite(discount) && discount > 0 ? discount : price,
    ml: Number(raw.ml ?? raw.volume ?? detail.volume ?? 100),
    img: imageUrl || raw.img || raw.image || raw.imageUrl || raw.image_url || 'https://picsum.photos/seed/perfume/300/350',
  };
}

const unwrapList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.perfumes)) return data.perfumes;
  return [];
};

export async function getProducts() {
  const data = await apiRequest('/perfumes');
  return unwrapList(data).map(normalizeProduct);
}

export async function getProduct(id) {
  const data = await apiRequest(`/perfumes/${encodeURIComponent(id)}`);
  return normalizeProduct(data?.data || data?.perfume || data);
}

export const createProduct = (product) => apiRequest('/perfumes', {
  method: 'POST', body: JSON.stringify(product),
});
export const updateProduct = (id, product) => apiRequest(`/perfumes/${encodeURIComponent(id)}`, {
  method: 'PUT', body: JSON.stringify(product),
});
export const deleteProduct = (id) => apiRequest(`/perfumes/${encodeURIComponent(id)}`, { method: 'DELETE' });

export async function loginApi(email, password) {
  const result = await apiRequest('/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  });
  const payload = result?.data || result;
  const token = payload.token || payload.accessToken || payload.access_token;
  if (token) localStorage.setItem('synpe_token', token);
  return { user: payload.user || payload.customer || payload, token };
}

export async function registerApi(name, email, password) {
  return apiRequest('/auth/register', {
    method: 'POST', body: JSON.stringify({ name, fullName: name, email, password }),
  });
}

export const createOrderApi = (order) => apiRequest('/orders', {
  method: 'POST', body: JSON.stringify(order),
});
