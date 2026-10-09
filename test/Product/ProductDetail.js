import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, CartPlus, Heart, StarFill, Star, Truck, ShieldCheck, ArrowRepeat } from 'react-bootstrap-icons';
import products from '../data/products';
import { useCart } from '../context/CartContext';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

const MOCK_REVIEWS = [
  { name: "Nguyễn Thị Lan", stars: 5, text: "Mùi hương tuyệt vời, rất lâu phai. Đóng gói cẩn thận, giao hàng nhanh!", date: "12/05/2026" },
  { name: "Trần Văn Minh",  stars: 4, text: "Sản phẩm chất lượng tốt, đúng hàng chính hãng. Sẽ mua lại lần sau.", date: "28/04/2026" },
  { name: "Phạm Thu Hương", stars: 5, text: "Rất hài lòng với sản phẩm. Mùi thơm sang trọng và kéo dài cả ngày.", date: "15/04/2026" },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = products.find(p => p.id === parseInt(id));
  const related = products.filter(p => p.brand === product?.brand && p.id !== product?.id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  if (!product) {
    return (
      <NotFound>
        <h2>Không tìm thấy sản phẩm 😕</h2>
        <Link to="/">← Quay về trang chủ</Link>
      </NotFound>
    );
  }

  const discount = Math.round((1 - product.discount / product.price) * 100);

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    dispatch({ type: 'OPEN_CART' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Wrapper>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Quay lại
      </button>

      <div className="detail-grid">
        {/* ── Image ── */}
        <div className="img-section">
          <div className="main-img">
            <img src={product.img} alt={product.name} />
            <span className="badge-discount">-{discount}%</span>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="info-section">
          <span className="brand-tag">{product.brand}</span>
          <h1>{product.name}</h1>

          <div className="stars">
            {[1,2,3,4,5].map(s => s <= 4
              ? <StarFill key={s} size={16} color="#D4AF37" />
              : <Star key={s} size={16} color="#D4AF37" />
            )}
            <span>4.0 (127 đánh giá)</span>
          </div>

          <div className="price-row">
            <span className="new-price">{fmt(product.discount)}</span>
            <span className="old-price">{fmt(product.price)}</span>
            <span className="save-badge">Tiết kiệm {fmt(product.price - product.discount)}</span>
          </div>

          <div className="meta">
            <div><span>Dung tích:</span> <strong>{product.ml}ml</strong></div>
            <div><span>Phân loại:</span> <strong>{product.category}</strong></div>
            <div><span>Thương hiệu:</span> <strong>{product.brand}</strong></div>
            <div><span>Tình trạng:</span> <strong className="in-stock">Còn hàng ✓</strong></div>
          </div>

          <div className="qty-row">
            <label>Số lượng:</label>
            <div className="qty-ctrl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="actions">
            <button className={`add-btn ${added ? 'done' : ''}`} onClick={handleAddCart}>
              <CartPlus size={20} />
              {added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
            </button>
            <button className={`wish-btn ${wished ? 'wished' : ''}`} onClick={() => setWished(v => !v)}>
              <Heart size={20} />
            </button>
          </div>

          <div className="perks">
            <div><Truck size={18} /><span>Giao hàng miễn phí cho đơn từ 500K</span></div>
            <div><ShieldCheck size={18} /><span>Hàng chính hãng 100%</span></div>
            <div><ArrowRepeat size={18} /><span>Đổi trả trong 7 ngày</span></div>
          </div>
        </div>
      </div>

      {/* ── Description ── */}
      <div className="desc-section">
        <h2>Mô tả sản phẩm</h2>
        <p>
          <strong>{product.name}</strong> là một trong những tác phẩm đỉnh cao của thương hiệu <strong>{product.brand}</strong> —
          dòng nước hoa cao cấp được chế tác từ những nguyên liệu thiên nhiên tinh tế nhất.
          Mùi hương hòa quyện giữa những nốt đầu tươi mát, nốt giữa hoa cỏ sang trọng và nốt cuối gỗ ấm áp,
          tạo nên một vũ trụ mùi hương không thể quên.
        </p>
        <p>
          Nước hoa {product.category === 'Nam' ? 'nam' : product.category === 'Nữ' ? 'nữ' : 'unisex'} {product.ml}ml này
          mang đến sức lưu hương lên đến 8-12 giờ trên da, phù hợp cho cả ngày dài bận rộn và những buổi tối đặc biệt.
        </p>
      </div>

      {/* ── Reviews ── */}
      <div className="reviews-section">
        <h2>Đánh giá từ khách hàng</h2>
        <div className="reviews-grid">
          {MOCK_REVIEWS.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <div className="avatar">{r.name[0]}</div>
                <div>
                  <strong>{r.name}</strong>
                  <p>{r.date}</p>
                </div>
              </div>
              <div className="stars-sm">
                {[1,2,3,4,5].map(s => s <= r.stars
                  ? <StarFill key={s} size={13} color="#D4AF37" />
                  : <Star key={s} size={13} color="#D4AF37" />
                )}
              </div>
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <div className="related-section">
          <h2>Sản phẩm cùng thương hiệu</h2>
          <div className="related-grid">
            {related.map(item => (
              <Link to={`/product/${item.id}`} key={item.id} className="related-card">
                <img src={item.img} alt={item.name} />
                <div>
                  <p className="r-name">{item.name}</p>
                  <p className="r-price">{fmt(item.discount)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const NotFound = styled.div`
  text-align: center;
  padding: 100px 20px;
  h2 { margin-bottom: 20px; }
  a { color: #D4AF37; text-decoration: none; }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 5% 80px;

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid rgba(212,175,55,0.3);
    color: inherit;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 30px;
    transition: all 0.2s;
    &:hover { border-color: #D4AF37; color: #D4AF37; }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    margin-bottom: 60px;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  .img-section {
    .main-img {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      background: #111520;
      aspect-ratio: 4/5;

      body:not(.dark) & { background: #f5f5f5; }

      img { width: 100%; height: 100%; object-fit: cover; }

      .badge-discount {
        position: absolute;
        top: 16px;
        left: 16px;
        background: #D4AF37;
        color: #000;
        font-weight: 700;
        font-size: 14px;
        padding: 5px 12px;
        border-radius: 20px;
      }
    }
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .brand-tag {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #D4AF37;
      font-weight: 700;
    }

    h1 { font-size: 30px; font-weight: 800; margin: 0; line-height: 1.2; }

    .stars {
      display: flex;
      align-items: center;
      gap: 4px;
      span { font-size: 13px; color: #888; margin-left: 6px; }
    }

    .price-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      .new-price { font-size: 32px; font-weight: 800; color: #D4AF37; }
      .old-price { text-decoration: line-through; color: #666; font-size: 18px; }
      .save-badge {
        background: rgba(212,175,55,0.15);
        color: #D4AF37;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      font-size: 14px;

      span { color: #888; }
      strong { color: inherit; }
      .in-stock { color: #27ae60; }
    }

    .qty-row {
      display: flex;
      align-items: center;
      gap: 16px;

      label { font-size: 14px; color: #888; }

      .qty-ctrl {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(255,255,255,0.05);
        border-radius: 10px;
        padding: 6px 12px;
        border: 1px solid rgba(212,175,55,0.2);

        body:not(.dark) & { background: #f5f5f5; }

        button {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #D4AF37;
          background: transparent;
          color: #D4AF37;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover { background: #D4AF37; color: #000; }
        }

        span { font-weight: 700; min-width: 24px; text-align: center; font-size: 16px; }
      }
    }

    .actions {
      display: flex;
      gap: 12px;

      .add-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px;
        background: #D4AF37;
        color: #000;
        border: none;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;

        &:hover { background: #c09d2e; transform: translateY(-1px); }
        &.done { background: #27ae60; color: #fff; }
      }

      .wish-btn {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        border: 1px solid rgba(212,175,55,0.3);
        background: transparent;
        color: #888;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        flex-shrink: 0;

        &:hover, &.wished { color: #e74c3c; border-color: #e74c3c; background: rgba(231,76,60,0.1); }
      }
    }

    .perks {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 6px;
      border-top: 1px solid rgba(255,255,255,0.08);

      body:not(.dark) & { border-top-color: #eee; }

      > div {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #888;

        svg { color: #D4AF37; flex-shrink: 0; }
      }
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #D4AF37;
  }

  .desc-section, .reviews-section, .related-section {
    margin-bottom: 50px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 40px;

    body:not(.dark) & { border-top-color: #eee; }

    p { color: #aaa; line-height: 1.8; margin-bottom: 12px; }
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;

    .review-card {
      background: #111520;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(255,255,255,0.05);

      body:not(.dark) & { background: #f9f9f9; border-color: #eee; }

      .review-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #D4AF37;
          color: #000;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        strong { font-size: 14px; }
        p { font-size: 12px; color: #888; margin: 0; }
      }

      .stars-sm { display: flex; gap: 2px; margin-bottom: 10px; }
      .review-text { font-size: 13px; color: #aaa; line-height: 1.6; margin: 0; }
    }
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;

    .related-card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      background: #111520;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.3s;

      body:not(.dark) & { background: #fff; border-color: #eee; }

      &:hover { transform: translateY(-4px); }

      img { width: 100%; height: 160px; object-fit: cover; }

      > div {
        padding: 12px;

        .r-name { font-size: 13px; margin: 0 0 5px; font-weight: 600; }
        .r-price { color: #D4AF37; font-weight: 700; font-size: 14px; margin: 0; }
      }
    }
  }
`;

export default ProductDetail;
