import React from 'react';
import styled from 'styled-components';
import { Award, Globe, People, HeartFill } from 'react-bootstrap-icons';

const STATS = [
  { icon: <Award size={32} />, value: '10+', label: 'Năm kinh nghiệm' },
  { icon: <Globe size={32} />, value: '50+', label: 'Thương hiệu quốc tế' },
  { icon: <People size={32} />, value: '20K+', label: 'Khách hàng tin tưởng' },
  { icon: <HeartFill size={32} />, value: '100%', label: 'Hàng chính hãng' },
];

const TEAM = [
  { name: 'Trần Đức Hiếu', role: 'Founder & CEO', img: 'https://picsum.photos/seed/ceo1/200/200' },
  { name: 'Văn Hoa', role: 'Head of Fragrance', img: 'https://picsum.photos/seed/hf1/200/200' },
  { name: 'Nguyễn Sỹ Khánh Anh', role: 'Marketing Director', img: 'https://picsum.photos/seed/md1/200/200' },
];

const About = () => (
  <Wrapper>
    {/* Hero */}
    <section className="hero">
      <div className="hero-text">
        <span className="label">Về chúng tôi</span>
        <h1>Chế tác hương thơm,<br />tạo dựng ký ức</h1>
        <p>
          SynPe ra đời từ tình yêu với nghệ thuật nước hoa. Chúng tôi tin rằng mỗi mùi hương
          không chỉ là một sản phẩm — đó là một cung bậc cảm xúc, một dấu ấn không thể quên
          trong hành trình của bạn.
        </p>
      </div>
      <div className="hero-img">
        <img src="https://picsum.photos/seed/about-synpe/600/500" alt="SynPe store" />
      </div>
    </section>

    {/* Stats */}
    <section className="stats">
      {STATS.map((s, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-icon">{s.icon}</div>
          <h2>{s.value}</h2>
          <p>{s.label}</p>
        </div>
      ))}
    </section>

    {/* Mission */}
    <section className="mission">
      <h2>Sứ mệnh của chúng tôi</h2>
      <div className="mission-grid">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8" />
          </svg>
          <h3> Chất lượng vượt trội</h3>
          <p>Chúng tôi chỉ hợp tác với các thương hiệu nước hoa hàng đầu thế giới,
            đảm bảo mỗi sản phẩm tại SynPe đều là hàng chính hãng 100%,
            có giấy tờ kiểm định đầy đủ.</p>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M11.175 19.688q-.4-.188-.7-.538L2.825 10q-.225-.275-.337-.6t-.113-.675q0-.225.038-.462t.162-.438L4.45 4.1q.275-.5.738-.8T6.225 3h11.55q.575 0 1.038.3t.737.8l1.875 3.725q.125.2.163.437t.037.463q0 .35-.112.675t-.338.6l-7.65 9.15q-.3.35-.7.538t-.825.187t-.825-.187M9.625 8h4.75l-1.5-3h-1.75zM11 16.675V10H5.45zm2 0L18.55 10H13zM16.6 8h2.65l-1.5-3H15.1zM4.75 8H7.4l1.5-3H6.25z" />
          </svg>
          <h3>Trải nghiệm cao cấp</h3>
          <p>Từ thiết kế cửa hàng đến dịch vụ chăm sóc khách hàng,
            chúng tôi tạo ra một hành trình mua sắm tinh tế và đáng nhớ
            xứng tầm với những thương hiệu xa xỉ.</p>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M21.6 2.7c0-.2-.2-.3-.4-.4c-3.8-1-7.9.3-10.4 3.3L9.5 7.1l-2.7-.7c-1.1-.4-2.2.1-2.7 1.1L2 11.2s0 .1-.1.1c-.1.3.1.5.4.6l3.4.7c-.3.9-.6 1.8-.7 2.7c0 .2 0 .3.1.4l3 2.9c.1.1.2.1.4.1c.9-.1 1.9-.3 2.8-.6l.7 3.3c0 .2.3.4.5.4c.1 0 .2 0 .2-.1l3.7-2.1c.9-.5 1.3-1.6 1.1-2.6l-.7-2.9l1.4-1.3c3.1-2.3 4.4-6.3 3.4-10.1M3.2 11.1L4.9 8c.3-.6.9-.8 1.5-.6l2.3.6l-1 1.2c-.6.8-1.2 1.6-1.6 2.5zM16 19l-3.1 1.8l-.6-2.9c.9-.4 1.7-1 2.5-1.6l1.3-1.2l.6 2.3c0 .6-.2 1.3-.7 1.6m1.6-6.7l-3.5 3.2c-1.5 1.3-3.4 2.1-5.4 2.3l-2.6-2.6c.3-2 1.1-3.9 2.4-5.4L10.1 8l.1-.1l1.4-1.6c2.2-2.6 5.8-3.8 9.1-3.1c.7 3.4-.4 6.9-3.1 9.1m-1.2-6.7c-1.1 0-1.9.9-1.9 1.9s.9 1.9 1.9 1.9c1.1 0 1.9-.9 1.9-1.9s-.8-1.9-1.9-1.9m0 2.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9s.9.4.9.9s-.4.9-.9.9" />
          </svg>
          <h3>Đổi mới không ngừng</h3>
          <p>Chúng tôi liên tục cập nhật những bộ sưu tập mới nhất,
            đem đến cho khách hàng cơ hội sở hữu những mùi hương
            giới hạn và độc quyền.</p>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="team">
      <h2>Đội ngũ sáng lập</h2>
      <div className="team-grid">
        {TEAM.map((m, i) => (
          <div className="member-card" key={i}>
            <img src={m.img} alt={m.name} />
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 5% 80px;

  section { margin-bottom: 70px; }

  h2 {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 30px;
    text-align: center;
    color: #D4AF37;
  }

  /* Hero */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 768px) { grid-template-columns: 1fr; }

    .hero-text {
      .label {
        font-size: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #D4AF37;
        font-weight: 600;
      }

      h1 {
        font-size: 42px;
        font-weight: 900;
        line-height: 1.15;
        margin: 12px 0 20px;
      }

      p { color: #888; line-height: 1.8; font-size: 15px; }
    }

    .hero-img {
      border-radius: 24px;
      overflow: hidden;
      img { width: 100%; height: 100%; object-fit: cover; display: block; }
    }
  }

  /* Stats */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 20px;

    .stat-card {
      text-align: center;
      padding: 30px 20px;
      background: #111520;
      border-radius: 16px;
      border: 1px solid rgba(212,175,55,0.15);
      transition: transform 0.3s;

      body:not(.dark) & { background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.07); }

      &:hover { transform: translateY(-5px); }

      .stat-icon { color: #D4AF37; margin-bottom: 12px; }

      h2 {
        font-size: 36px;
        font-weight: 900;
        margin: 0 0 6px;
        color: #fff;
        body:not(.dark) & { color: #111; }
      }

      p { color: #888; font-size: 13px; margin: 0; }
    }
  }

  /* Mission */
  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;

    > div {
      padding: 28px;
      background: #111520;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.05);

      body:not(.dark) & { background: #f9f9f9; border-color: #eee; }

      h3 { font-size: 17px; margin: 0 0 12px; }
      p { color: #888; font-size: 14px; line-height: 1.7; margin: 0; }
    }
  }

  /* Team */
  .team-grid {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    .member-card {
      text-align: center;
      width: 200px;

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #D4AF37;
        margin-bottom: 14px;
      }

      h3 { font-size: 16px; margin: 0 0 4px; }
      p { color: #888; font-size: 13px; margin: 0; }
    }
  }
`;

export default About;
