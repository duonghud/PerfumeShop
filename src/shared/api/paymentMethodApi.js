const API_BASE_URL = 'http://localhost:8080/payment_methods';
const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// Lấy danh sách phương thức thanh toán
export const getPaymentMethods = async () => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách phương thức thanh toán.');
    }
    return response.json();
};

// Thêm mới
export const createPaymentMethod = async (paymentData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi thêm phương thức thanh toán.');
    }
    return response.json();
};

// Cập nhật
export const updatePaymentMethod = async (id, paymentData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi cập nhật phương thức thanh toán.');
    }
    return response.json();
};

// Xóa
export const deletePaymentMethod = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi xóa phương thức thanh toán.');
    }
    return true;
};