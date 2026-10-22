export function normalizeProduct(raw = {}) {
  const detail = raw.perfumeDetail || raw.detail || {};
  const images = raw.images || raw.imageList || [];
  const firstImage = Array.isArray(images) ? images[0] : null;
  const imageUrl = typeof firstImage === 'string'
    ? firstImage
    : firstImage?.imageUrl || firstImage?.image_url || firstImage?.url;
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

export function unwrapProducts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.perfumes)) return data.perfumes;
  return [];
}
