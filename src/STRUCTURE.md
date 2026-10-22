# Cấu trúc src sau khi phân chia

- `features/admin/pages/AdminPage.jsx`: giao diện quản trị hiện tại.
- `features/customer/pages/`: các trang dành cho khách hàng (trang chủ, giới thiệu, thanh toán, lịch sử đơn hàng).
- `features/customer/products/`: danh sách sản phẩm và chi tiết sản phẩm.
- `features/customer/components/`: Header, Footer, Cart, AuthModal, Contact và các component giao diện hiện có.
- `shared/api/`: gọi API backend.
- `shared/context/`: AuthContext, CartContext dùng chung.
- `shared/api/products/`: các request riêng để đọc, thêm, sửa và xóa sản phẩm; sản phẩm được tải từ backend.
- `shared/hooks/`: custom hooks dùng chung.
- `App.jsx`, `index.jsx`, CSS gốc và các file cấu hình kiểm thử vẫn ở thư mục `src/`.

Lưu ý: `AdminPage.jsx` hiện vẫn là một component quản trị tổng hợp; cấu trúc thư mục đã tách khu vực admin/customer, nhưng chưa tách logic bên trong trang admin thành từng module CRUD riêng.
