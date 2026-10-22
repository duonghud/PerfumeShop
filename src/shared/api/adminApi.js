const API_BASE_URL = 'http://localhost:8080/admins'; // Điều chỉnh endpoint theo Controller backend của bạn

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

// Lấy danh sách admin
export const getAdmins = async () => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách quản trị viên.');
    }
    return response.json();
};

// Thêm mới admin
export const createAdmin = async (adminData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(adminData),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi thêm quản trị viên.');
    }
    return response.json();
};

// Cập nhật admin
export const updateAdmin = async (id, adminData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(adminData),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi cập nhật quản trị viên.');
    }
    return response.json();
};

// Xóa admin
export const deleteAdmin = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Lỗi khi xóa quản trị viên.');
    }
    return true;
};