import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { StarFill, ShieldCheck, Truck, Arrow90degRight, ArrowRight } from 'react-bootstrap-icons';
import products from '../data/products';
import { useCart } from '../context/CartContext';

const fmt = v => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

const FEATURED_IDS = [1, 5, 11, 21, 31, 41];
const featured = products.filter(p => FEATURED_IDS.includes(p.id)).slice(0, 6);

const BRANDS = ['Chanel', 'Dior', 'Gucci', 'YSL', 'Versace', 'Tom Ford', 'Hermès', 'Burberry'];

const REVIEWS = [
  { name: 'Linh Nguyễn', rating: 5, text: 'Sản phẩm chính hãng 100%, giao hàng nhanh. Mùi hương y hệt counters cao cấp!', product: 'Chanel No.5' },
  { name: 'Minh Đức', rating: 5, text: 'Đóng gói cực kỳ cẩn thận, mua lần thứ 3 rồi vẫn rất hài lòng.', product: 'Dior Sauvage' },
  { name: 'Thu Hà', rating: 5, text: 'Shop tư vấn nhiệt tình, mua đúng mùi hương phù hợp với mình.', product: 'Gucci Bloom' },
];

const HomePage = () => {
  const { dispatch } = useCart();
  const shopRef = useRef(null);
  const navigate = useNavigate();

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Wrapper>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <Hero>
        <div className="hero-bg" aria-hidden="true">
          {[...Array(12)].map((_, i) => <div key={i} className="particle" />)}
        </div>
        <div className="hero-content">
          <h1>
            Nghệ thuật<br />
            <em>nước hoa</em><br />
            đích thực
          </h1>
          <p>Khám phá bộ sưu tập hơn 200+ mùi hương cao cấp từ các thương hiệu danh tiếng thế giới — Chanel, Dior, Gucci và nhiều hơn nữa.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToShop}>Khám phá ngay</button>
            <Link to="/about" className="btn-ghost">Về chúng tôi <ArrowRight size ={16} /></Link>
          </div>
          <div className="hero-stats">
            <div><strong>200+</strong><span>Mùi hương</span></div>
            <div><strong>20K+</strong><span>Khách hàng</span></div>
            <div><strong>4.9★</strong><span>Đánh giá</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow" />
          <div className="bottle-wrap">
            <img src="https://picsum.photos/seed/hero-perfume/380/480" alt="SynPe hero" />
          </div>
        </div>
      </Hero>

      {/* ── MARQUEE BRANDS ─────────────────────────────────────── */}
      <MarqueeWrap>
        <div className="track">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="brand-chip">{b}</span>
          ))}
        </div>
      </MarqueeWrap>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <Features>
        {[
          { icon: <ShieldCheck size={28} />, title: 'Chính hãng 100%', desc: 'Nhập khẩu trực tiếp từ nhà phân phối ủy quyền' },
          { icon: <Truck size={28} />, title: 'Giao hàng toàn quốc', desc: 'Đóng gói cẩn thận, vận chuyển an toàn tới tận tay bạn' },
          { icon: <Arrow90degRight size={28} />, title: 'Đổi trả 30 ngày', desc: 'Cam kết hoàn tiền hoặc đổi hàng trong 30 ngày' },
          { icon: <StarFill size={28} />, title: 'Tư vấn miễn phí', desc: 'Đội ngũ chuyên gia hỗ trợ chọn mùi phù hợp với bạn' },
        ].map((f, i) => (
          <div className="feature" key={i}>
            <div className="feat-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </Features>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
      <section ref={shopRef}>
        <SectionHeader>
          <div>
            <span className="eyebrow">Nổi bật</span>
            <h2>Sản phẩm được yêu thích</h2>
          </div>
          <Link to="/shop" className="see-all">Xem tất cả <ArrowRight size={16} /></Link>
        </SectionHeader>
        <ProductGrid>
          {featured.map(p => (
            <ProductCard key={p.id}>
              <div className="img-wrap" onClick={() => navigate(`/product/${p.id}`)}>
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="overlay">
                  <button onClick={e => { e.stopPropagation(); navigate(`/product/${p.id}`); }}>Xem chi tiết</button>
                </div>
                <span className="badge-sale">-{Math.round((1 - p.discount / p.price) * 100)}%</span>
              </div>
              <div className="card-body">
                <span className="brand">{p.brand}</span>
                <h3 onClick={() => navigate(`/product/${p.id}`)}>{p.name}</h3>
                <div className="meta">
                  <span className="cat">{p.category}</span>
                  <span className="ml">{p.ml}ml</span>
                </div>
                <div className="price-row">
                  <div>
                    <span className="price">{fmt(p.discount)}</span>
                    <span className="original">{fmt(p.price)}</span>
                  </div>
                  <button
                    className="add-btn"
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
                    title="Thêm vào giỏ"
                  ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M1 2h3l3 11l-1 4h15M7 21a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm14 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7 13h12l3-9H4.545z" />
                    </svg>
                  </button>
                </div>
              </div>
            </ProductCard>
          ))}
        </ProductGrid>
      </section>

      {/* ── BANNER CTA ─────────────────────────────────────────── */}
      <Banner>
        <div className="banner-text">
          <h2>Tìm mùi hương <em>hoàn hảo</em> cho bạn</h2>
          <p>Hãy để đội ngũ chuyên gia SynPe tư vấn và giúp bạn lựa chọn nước hoa phù hợp nhất.</p>
          <Link to="/contact" className="btn-light">Liên hệ tư vấn ngay →</Link>
        </div>
        <div className="banner-deco" aria-hidden="true">
          {['SP1', 'SP2', 'SP3'].map((s, i) => (
            <img key={s} src={`https://picsum.photos/seed/${s}banner/200/240`} alt="" style={{ '--i': i }} />
          ))}
        </div>
      </Banner>

      {/* ── REVIEWS ────────────────────────────────────────────── */}
      <section>
        <SectionHeader>
          <div>
            <span className="eyebrow">Đánh giá</span>
            <h2>Khách hàng nói gì về chúng tôi</h2>
          </div>
        </SectionHeader>
        <ReviewGrid>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i}>
              <div className="stars">{'★'.repeat(r.rating)}</div>
              <p>"{r.text}"</p>
              <div className="reviewer">
                <div className="avatar">{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.product}</span>
                </div>
              </div>
            </ReviewCard>
          ))}
        </ReviewGrid>
      </section>
    </Wrapper>
  );
};

/* ─── Animations ─────────────────────────────────────────────── */
const fadeUp = keyframes`from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}`;
const marquee = keyframes`from{transform:translateX(0)}to{transform:translateX(-50%)}`;
const glow = keyframes`0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.7;transform:scale(1.08)}`;
const pulse = keyframes`0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(1)}50%{opacity:0.6;transform:translate(-50%,-50%) scale(1.3)}`;

/* ─── Styled ─────────────────────────────────────────────────── */
const Wrapper = styled.div`
  section { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
`;

const Hero = styled.section`
  && {
    max-width: 100%; padding: 0;
    background: linear-gradient(135deg, #080a10 0%, #0d1020 60%, #110e08 100%);
    min-height: 92vh; display: flex; align-items: center;
    justify-content: center; gap: 60px; padding: 80px 8%;
    position: relative; overflow: hidden;
    body:not(.dark) & { background: linear-gradient(135deg, #0d0f1a 0%, #1a1530 60%, #160f08 100%); }
  }

  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    .particle {
      position: absolute; width: 2px; height: 2px;
      background: #D4AF37; border-radius: 50%; opacity: 0.4;
      animation: ${pulse} calc(3s + var(--i, 0) * 0.5s) ease-in-out infinite;
    }
    ${[...Array(12)].map((_, i) => `
      .particle:nth-child(${i + 1}) {
        --i: ${i}; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
        animation-delay: ${i * 0.4}s;
      }
    `).join('')}
  }

  .hero-content {
    flex: 1; max-width: 560px; z-index: 1;
    animation: ${fadeUp} 0.7s ease both;
    .badge { display: inline-block; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.35);
      color: #D4AF37; padding: 6px 14px; border-radius: 20px; font-size: 13px;
      letter-spacing: 0.5px; margin-bottom: 24px; }
    h1 { font-size: clamp(38px,5vw,64px); font-weight: 900; line-height: 1.08;
      color: #fff; margin: 0 0 24px; letter-spacing: -1px;
      em { font-style: normal; background: linear-gradient(90deg,#D4AF37,#f7e08a,#D4AF37);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; } }
    p { color: rgba(255,255,255,0.65); font-size: 17px; line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
    .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn-primary { padding: 14px 32px; background: #D4AF37; color: #000; border: none;
      border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer;
      transition: all 0.3s; text-decoration: none; display: inline-block;
      &:hover { background: #c9a227; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.4); } }
    .btn-ghost { padding: 14px 28px; background: transparent;
      border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8);
      border-radius: 12px; font-size: 15px; text-decoration: none; display: flex;
      align-items: center; gap: 8px; transition: all 0.3s;
      &:hover { border-color: #D4AF37; color: #D4AF37; } }
    .hero-stats { display: flex; gap: 40px;
      div { strong { display: block; font-size: 22px; font-weight: 800; color: #D4AF37; }
            span { font-size: 13px; color: rgba(255,255,255,0.5); } } }
  }

  .hero-visual {
    flex-shrink: 0; position: relative; z-index: 1;
    animation: ${fadeUp} 0.7s 0.15s ease both;
    .glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%);
      animation: ${glow} 3s ease-in-out infinite; }
    .bottle-wrap {
      position: relative; z-index: 1; animation: ${float} 4s ease-in-out infinite;
      img { width: 320px; max-width: 40vw; border-radius: 20px;
        box-shadow: 0 30px 60px rgba(0,0,0,0.5); } }
  }

  @media(max-width: 820px) {
    && { flex-direction: column; text-align: center; min-height: auto; padding: 60px 6%; }
    .hero-content { max-width: 100%; p { max-width: 100%; } .hero-actions { justify-content: center; } .hero-stats { justify-content: center; } }
    .hero-visual .bottle-wrap img { width: 200px; }
  }
`;

const MarqueeWrap = styled.div`
  overflow: hidden; padding: 20px 0;
  background: rgba(212,175,55,0.06); border-top: 1px solid rgba(212,175,55,0.12); border-bottom: 1px solid rgba(212,175,55,0.12);
  .track { display: flex; gap: 40px; width: max-content; animation: ${marquee} 18s linear infinite; }
  .brand-chip { font-size: 14px; font-weight: 700; letter-spacing: 2px; color: #D4AF37; opacity: 0.7;
    text-transform: uppercase; white-space: nowrap; }
`;

const Features = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 60px 20px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  @media(max-width:900px) { grid-template-columns: repeat(2,1fr); }
  @media(max-width:500px) { grid-template-columns: 1fr; }
  .feature {
    text-align: center; padding: 32px 20px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; transition: all 0.3s;
    body:not(.dark) & { background: #fafaf8; border-color: #f0e8c0; }
    &:hover { border-color: rgba(212,175,55,0.3); transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
    .feat-icon { color: #D4AF37; margin-bottom: 14px; }
    h3 { font-size: 16px; font-weight: 700; margin: 0 0 8px; }
    p { font-size: 13px; color: #888; line-height: 1.6; margin: 0;
      body:not(.dark) & { color: #666; } }
  }
`;

const SectionHeader = styled.div`
  display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px;
  .eyebrow { display: block; font-size: 12px; letter-spacing: 3px; color: #D4AF37;
    text-transform: uppercase; margin-bottom: 8px; }
  h2 { font-size: 28px; font-weight: 800; margin: 0; }
  .see-all { display: flex; align-items: center; gap: 6px; color: #D4AF37;
    text-decoration: none; font-size: 14px; font-weight: 600; transition: gap 0.2s;
    &:hover { gap: 10px; } }
`;

const ProductGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
  @media(max-width:900px) { grid-template-columns: repeat(2,1fr); }
  @media(max-width:500px) { grid-template-columns: 1fr; }
`;

const ProductCard = styled.div`
  border-radius: 16px; overflow: hidden;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.3s;
  body:not(.dark) & { background: #fff; border-color: #f0e8c0; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  &:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); border-color: rgba(212,175,55,0.25); }

  .img-wrap { position: relative; cursor: pointer; overflow: hidden; aspect-ratio: 3/3.5;
    img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    &:hover img { transform: scale(1.06); }
    .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex;
      align-items: flex-end; justify-content: center; padding-bottom: 20px;
      opacity: 0; transition: opacity 0.3s;
      button { background: rgba(255,255,255,0.9); color: #000; border: none; border-radius: 8px;
        padding: 10px 22px; font-size: 13px; font-weight: 700; cursor: pointer; } }
    &:hover .overlay { opacity: 1; }
    .badge-sale { position: absolute; top: 12px; left: 12px;
      background: #e74c3c; color: #fff; font-size: 11px; font-weight: 700;
      padding: 4px 8px; border-radius: 6px; }
  }
  .card-body { padding: 16px; }
  .brand { font-size: 11px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; font-weight: 700; }
  h3 { font-size: 14px; font-weight: 600; margin: 4px 0 6px; cursor: pointer; line-height: 1.4;
    &:hover { color: #D4AF37; } }
  .meta { display: flex; gap: 8px; margin-bottom: 12px;
    span { font-size: 11px; padding: 3px 8px; border-radius: 20px; background: rgba(255,255,255,0.06); color: #888;
      body:not(.dark) & { background: #f0ece0; } } }
  .price-row { display: flex; align-items: center; justify-content: space-between; }
  .price { font-size: 16px; font-weight: 800; color: #D4AF37; }
  .original { font-size: 12px; color: #666; text-decoration: line-through; margin-left: 6px; }
  .add-btn { width: 34px; height: 34px; border-radius: 50%; background: #D4AF37; color: #000;
    border: none; font-size: 22px; line-height: 1; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    &:hover { background: #c9a227; transform: scale(1.1); } }
`;

const Banner = styled.div`
  margin: 0; padding: 70px 8%;
  background: linear-gradient(135deg, #1a1206, #0d0f1a, #0a0d16);
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
  position: relative; overflow: hidden;
  body:not(.dark) & { background: linear-gradient(135deg, #2a1f06, #1a1a35, #0a0d20); }

  .banner-text {
    max-width: 500px; z-index: 1;
    h2 { font-size: clamp(26px,3.5vw,42px); font-weight: 800; color: #fff; margin: 0 0 16px;
      em { font-style: normal; color: #D4AF37; } }
    p { color: rgba(255,255,255,0.6); font-size: 16px; line-height: 1.7; margin-bottom: 28px; }
    .btn-light { display: inline-block; padding: 14px 28px; background: #D4AF37; color: #000;
      border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;
      transition: all 0.3s;
      &:hover { background: #f0c84a; transform: translateY(-2px); } }
  }

  .banner-deco {
    display: flex; gap: 16px; flex-shrink: 0;
    img { width: 100px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      transform: rotate(calc(var(--i) * 5deg - 5deg)); transition: transform 0.3s;
      &:hover { transform: rotate(0) scale(1.05); } }
    @media(max-width:700px) { display: none; }
  }
`;

const ReviewGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
  @media(max-width:900px) { grid-template-columns: repeat(2,1fr); }
  @media(max-width:500px) { grid-template-columns: 1fr; }
`;

const ReviewCard = styled.div`
  padding: 24px; border-radius: 16px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  transition: all 0.3s;
  body:not(.dark) & { background: #fafaf8; border-color: #f0e8c0; }
  &:hover { border-color: rgba(212,175,55,0.25); transform: translateY(-3px); }
  .stars { color: #D4AF37; font-size: 18px; margin-bottom: 12px; }
  p { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.75); margin: 0 0 20px;
    font-style: italic;
    body:not(.dark) & { color: #444; } }
  .reviewer { display: flex; align-items: center; gap: 12px;
    .avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,#D4AF37,#c9a227);
      color: #000; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; }
    strong { display: block; font-size: 14px; }
    span { font-size: 12px; color: #888; }
  }
`;

export default HomePage;
