const API_URL = 'http://localhost:8080/customers';

const getHeaders = () => {
const headers = {
'Content-Type': 'application/json',
};

const token = localStorage.getItem('token');

if (token) {
    headers.Authorization = `Bearer ${token}`;
}

return headers;


};

// Lấy danh sách khách hàng
export const getCustomers = async () => {
const response = await fetch(API_URL, {
method: 'GET',
headers: getHeaders(),
});


if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
        throw new Error('Bạn không có quyền truy cập hoặc phiên đăng nhập đã hết hạn.');
    }

    throw new Error(`Không thể tải danh sách khách hàng (${response.status}).`);
}

return response.json();


};

// Lấy khách hàng theo ID
export const getCustomerById = async (customerId) => {
const response = await fetch(`${API_URL}/${customerId}`, {
method: 'GET',
headers: getHeaders(),
});


if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
        throw new Error('Bạn không có quyền truy cập hoặc phiên đăng nhập đã hết hạn.');
    }

    if (response.status === 404) {
        throw new Error('Không tìm thấy khách hàng.');
    }

    throw new Error(`Không thể tải thông tin khách hàng (${response.status}).`);
}

return response.json();


};
