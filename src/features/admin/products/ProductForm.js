import React from 'react';

const fields = [
  { name: 'name', label: 'Tên sản phẩm', type: 'text', required: true },
  { name: 'brand', label: 'Thương hiệu', type: 'text', required: true },
  { name: 'category', label: 'Danh mục', type: 'text', required: true },
  { name: 'price', label: 'Giá gốc (VND)', type: 'number', min: '0', required: true },
  { name: 'discountPrice', label: 'Giá khuyến mãi (VND)', type: 'number', min: '0' },
  { name: 'volume', label: 'Dung tích (ml)', type: 'number', min: '0', required: true },
  { name: 'imageUrl', label: 'URL hình ảnh', type: 'url' },
];

export default function ProductForm({ titleId, form, error, saving, submitLabel, onChange, onSubmit, onClose }) {
  return (
    <div className="products-modal-backdrop">
      <div className="products-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <h2 id={titleId}>{titleId === 'product-create-title' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}</h2>
        {error && <p className="products-error" role="alert">{error}</p>}
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <label className="products-field" key={field.name}>
              {field.label}
              <input
                name={field.name}
                type={field.type}
                min={field.min}
                required={field.required}
                value={form[field.name]}
                onChange={onChange}
              />
            </label>
          ))}
          <div className="products-modal-actions">
            <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : submitLabel}</button>
            <button type="button" onClick={onClose} disabled={saving}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
}
