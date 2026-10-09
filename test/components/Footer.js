import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <Foot>
      <div className="footer-content">
        <div className="col">
          <h2 className="brand">SynPe</h2>
          <p>Chế tác những kiệt tác vô hình. Mỗi mùi hương là một kiến trúc cảm xúc, được thiết kế để lại dấu ấn không thể quên.</p>
        </div>

        <div className="col">
          <h6>Liên kết</h6>
          <div className="footer-links">
            <Link to="/">Trang Chủ</Link>
            <Link to="/shop">Sản phẩm</Link>
            <Link to="/about">Giới thiệu</Link>
            <Link to="/contact">Liên hệ</Link>
          </div>
        </div>

        <div className="col">
          <h6>Liên Hệ</h6>
          <div className="footer-contact">
            <p>hello@synpe.com</p>
            <p>+84 123 456 789</p>
            <p>Hà Nội, Việt Nam</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 SynPe — All rights reserved.
      </div>
    </Foot>
  );
}

const Foot = styled.footer`
  background: #0a0c11;
  color: #ccc;
  padding: 50px 8% 20px;
  margin-top: auto;

  body:not(.dark) & {
    background: #111;
    color: #ccc;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 30px;
  }

  .brand {
    font-size: 28px;
    font-weight: 800;
    color: #D4AF37;
    letter-spacing: 3px;
    margin: 0 0 14px;
  }

  p { font-size: 13px; line-height: 1.7; margin: 0 0 6px; }

  h6 {
    color: #D4AF37;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin: 0 0 14px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 9px;

    a {
      color: #aaa;
      text-decoration: none;
      font-size: 13px;
      transition: color 0.3s;
      &:hover { color: #D4AF37; }
    }
  }

  .footer-contact p { color: #aaa; }

  .footer-bottom {
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 16px;
    font-size: 12px;
    color: #555;
  }
`;

export default Footer;
