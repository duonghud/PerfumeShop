import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Heart, CartPlus, Search } from 'react-bootstrap-icons';
import useProducts from '../../../shared/hooks/useProducts';
import { useCart } from '../../../shared/context/CartContext';

const CATEGORIES = ['Tất cả', 'Nam', 'Nữ', 'Unisex'];
const PAGE_SIZE = 20;

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

function Product() {
  const [searchParams] = useSearchParams();
  const { products, loading, apiError } = useProducts();
  const BRANDS = ['Tất cả', ...new Set(products.map(p => p.brand))];
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();

  const [brand, setBrand] = useState('Tất cả');
  const [category, setCategory] = useState('Tất cả');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [added, setAdded] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const urlSearch = searchParams.get('search') || '';

  const filtered = useMemo(() => {
    let list = [...products];
    if (urlSearch) list = list.filter(p =>
      p.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(urlSearch.toLowerCase())
    );
    if (brand !== 'Tất cả') list = list.filter(p => p.brand === brand);
    if (category !== 'Tất cả') list = list.filter(p => p.category === category);
    if (sort === 'price-asc') list.sort((a, b) => a.discount - b.discount);
    else if (sort === 'price-desc') list.sort((a, b) => b.discount - a.discount);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [urlSearch, brand, category, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [urlSearch, brand, category, sort]);

  const handleAddCart = (e, item) => {
    e.preventDefault();
    cartDispatch({ type: 'ADD_ITEM', payload: item });
    cartDispatch({ type: 'OPEN_CART' });
    setAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 1500);
  };

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const discount = p => Math.round((1 - p.discount / p.price) * 100);

  return (
    <Wrapper>
      {/* ── Banner ── */}
      <div className="banner">
        <h1>Bộ sưu tập nước hoa</h1>
        <p>{products.length} sản phẩm cao cấp • Hàng chính hãng • Giao hàng toàn quốc</p>
      </div>

      {/* ── Search info ── */}
      {apiError && <div role="status" style={{ padding: '8px 20px', color: '#a66b00', fontSize: 13 }}>Backend chưa kết nối; đang hiển thị dữ liệu mẫu. {apiError}</div>}
      {loading && <div style={{ padding: 12, textAlign: 'center' }}>Đang tải sản phẩm...</div>}
      {urlSearch && (
        <div className="search-info">
          <Search size={16} />
          Kết quả cho "<strong>{urlSearch}</strong>" — {filtered.length} sản phẩm
        </div>
      )}

      <div className="layout">
        {/* ── Sidebar filters ── */}
        <aside className="sidebar">
          <div className="filter-group">
            <h4>Danh mục</h4>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`filter-btn ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>

          <div className="filter-group">
            <h4>Thương hiệu</h4>
            <div className="brand-list">
              {BRANDS.map(b => (
                <button
                  key={b}
                  className={`filter-btn ${brand === b ? 'active' : ''}`}
                  onClick={() => setBrand(b)}
                >{b}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="main">
          <div className="toolbar">
            <span className="count">{filtered.length} sản phẩm</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="no-result">
              <p>😕 Không tìm thấy sản phẩm</p>
              <button onClick={() => { setBrand('Tất cả'); setCategory('Tất cả'); navigate('/'); }}>
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="grid">
                {paginated.map(item => (
                  <Link to={`/product/${item.id}`} key={item.id} className="card">
                    <div className="img-wrap">
                      <img src={item.img} alt={item.name} loading="lazy" />
                      <span className="badge-discount">-{discount(item)}%</span>
                      <button
                        className={`wish-btn ${wishlist.includes(item.id) ? 'wished' : ''}`}
                        onClick={e => toggleWishlist(e, item.id)}
                        title="Yêu thích"
                      >
                        <Heart size={16} />
                      </button>
                    </div>
                    <div className="card-body">
                      <span className="brand-tag">{item.brand}</span>
                      <h3>{item.name}</h3>
                      <p className="ml">{item.ml}ml • {item.category}</p>
                      <div className="prices">
                        <span className="old">{fmt(item.price)}</span>
                        <span className="new">{fmt(item.discount)}</span>
                      </div>
                      <button
                        className={`cart-btn ${added[item.id] ? 'done' : ''}`}
                        onClick={e => handleAddCart(e, item)}
                      >
                        <CartPlus size={16} />
                        {added[item.id] ? 'Đã thêm!' : 'Thêm vào giỏ'}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      className={page === p ? 'active' : ''}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >{p}</button>
                  ))}
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 80vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 60px;

  .banner {
    text-align: center;
    padding: 50px 20px 30px;

    h1 {
      font-size: 36px;
      font-weight: 800;
      margin: 0 0 10px;
      background: linear-gradient(135deg, #D4AF37, #f0d060);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p { color: #888; font-size: 15px; }
  }

  .search-info {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(212,175,55,0.1);
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 8px;
    padding: 10px 16px;
    margin-bottom: 24px;
    font-size: 14px;
    color: #ccc;

    strong { color: #D4AF37; }
  }

  .layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .sidebar {
    .filter-group {
      margin-bottom: 28px;

      h4 {
        font-size: 13px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #D4AF37;
        margin: 0 0 12px;
      }
    }

    .brand-list {
      max-height: 300px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;

      &::-webkit-scrollbar { width: 3px; }
      &::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
    }

    .filter-btn {
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #aaa;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover { background: rgba(212,175,55,0.1); color: #D4AF37; }
      &.active { background: #D4AF37; color: #000; font-weight: 600; }
    }
  }

  .main {
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .count { font-size: 14px; color: #888; }

      select {
        padding: 8px 14px;
        border-radius: 8px;
        border: 1px solid rgba(212,175,55,0.3);
        background: transparent;
        color: inherit;
        font-size: 13px;
        cursor: pointer;
        outline: none;

        option { background: #0b0d13; }
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .card {
    background: #111520;
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid rgba(255,255,255,0.05);

    body:not(.dark) & {
      background: #fff;
      border-color: #eee;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.3);
    }

    .img-wrap {
      position: relative;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
      }

      .badge-discount {
        position: absolute;
        top: 10px;
        left: 10px;
        background: #D4AF37;
        color: #000;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 20px;
      }

      .wish-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(0,0,0,0.5);
        border: none;
        color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;

        &:hover, &.wished { color: #e74c3c; background: rgba(231,76,60,0.15); }
      }
    }

    &:hover .img-wrap img { transform: scale(1.05); }

    .card-body {
      padding: 14px;

      .brand-tag {
        font-size: 10px;
        color: #D4AF37;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        font-weight: 600;
      }

      h3 {
        font-size: 14px;
        font-weight: 600;
        margin: 5px 0 3px;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .ml { font-size: 11px; color: #888; margin: 0 0 8px; }

      .prices {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;

        .old { text-decoration: line-through; color: #666; font-size: 12px; }
        .new { color: #D4AF37; font-weight: 700; font-size: 15px; }
      }

      .cart-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 9px;
        border-radius: 8px;
        border: none;
        background: #D4AF37;
        color: #000;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:hover { background: #c09d2e; }
        &.done { background: #27ae60; color: #fff; }
      }
    }
  }

  .no-result {
    text-align: center;
    padding: 80px 0;

    p { font-size: 20px; color: #888; margin-bottom: 20px; }

    button {
      padding: 12px 28px;
      background: #D4AF37;
      color: #000;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
    flex-wrap: wrap;

    button {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      border: 1px solid rgba(212,175,55,0.3);
      background: transparent;
      color: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) { background: rgba(212,175,55,0.2); }
      &.active { background: #D4AF37; color: #000; font-weight: 700; border-color: #D4AF37; }
      &:disabled { opacity: 0.4; cursor: default; }
    }
  }
`;

export default Product;
