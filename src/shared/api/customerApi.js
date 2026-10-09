const API_URL = 'http://localhost:8080/customers';

export const getCustomers = async () => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API_URL, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status}`);
    }

    const data = await response.json();

    console.log('Dữ liệu customers từ API:', data);

    return data;
};

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

const request = async (url, options = {}) => {
const response = await fetch(url, {
...options,
headers: {
...getHeaders(),
...options.headers,
},
});

if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
        throw new Error('Bạn không có quyền truy cập hoặc phiên đăng nhập đã hết hạn.');
    }

    const message = await response.text();
    throw new Error(message || `Yêu cầu thất bại (${response.status})`);
}

if (response.status === 204) {
    return null;
}

const text = await response.text();
return text ? JSON.parse(text) : null;

};


// GET: lấy khách hàng theo ID
export const getCustomerById = (customerId) =>
request(`${API_URL}/${customerId}`);

// POST: thêm khách hàng
export const createCustomer = (customer) =>
request(`${API_URL}/create`, {
method: 'POST',
body: JSON.stringify(customer),
});

// PUT: cập nhật khách hàng
export const updateCustomer = (customerId, customer) =>
request(`${API_URL}/update/${customerId}`, {
method: 'PUT',
body: JSON.stringify(customer),
});

// DELETE: xóa khách hàng
export const deleteCustomer = (customerId) =>
request(`${API_URL}/delete/${customerId}`, {
method: 'DELETE',
});
