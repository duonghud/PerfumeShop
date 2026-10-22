// Tất cả cấu hình và hàm gọi API tập trung tại đây.
export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export const getToken = () => localStorage.getItem('synpe_token') || localStorage.getItem('token');

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

// Khớp với @PostMapping("/auth/login") nhận Map<String, String>
export async function loginApi(email, password) {
  const result = await apiRequest('/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  });
  const token = result?.token || result?.accessToken || result?.access_token;
  if (token) {
    localStorage.setItem('synpe_token', token);
    localStorage.setItem('token', token);
  }
  return result; // Trả về object chứa { message, token }
}

// Khớp với @PostMapping("/auth/register")
export async function registerApi(name, email, password) {
  return apiRequest('/auth/register', {
    method: 'POST', body: JSON.stringify({ name, fullName: name, email, password }),
  });
}

export const createOrderApi = (order) => apiRequest('/orders', {
  method: 'POST', body: JSON.stringify(order),
});

export default apiRequest;