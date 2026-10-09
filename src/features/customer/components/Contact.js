import React from "react";
import styled from "styled-components";
import { Telephone, Envelope, GeoAlt } from "react-bootstrap-icons";

const Contact = () => {
  return (
    <Wrapper>
      <div className="contact-container">
        
        {/* LEFT */}
        <div className="left">
          <h1>Liên hệ với chúng tôi</h1>

          <p>
            Nếu bạn có bất kỳ câu hỏi nào về sản phẩm hoặc dịch vụ,
            hãy liên hệ với SynPe ngay hôm nay.
          </p>

          <div className="info">
            <div className="item">
              <Telephone className="icon" />
              <span>0123 456 789</span>
            </div>

            <div className="item">
              <Envelope className="icon" />
              <span>support@synpe.com</span>
            </div>

            <div className="item">
              <GeoAlt className="icon" />
              <span>Hà Nội, Việt Nam</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476857.77974676125!2d105.32307835420944!3d20.97453496319129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1779932238582!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>

      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: #0b0d13;
  color: white;
  padding: 60px 8%;

  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
  }

  /* LEFT */

  .left h1 {
    font-size: 42px;
    margin-bottom: 20px;
    color: #d4af37;
  }

  .left p {
    color: #bbb;
    line-height: 1.7;
    margin-bottom: 30px;
    font-size: 16px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 16px;
    color: #ddd;
  }

  .icon {
    color: #d4af37;
    font-size: 22px;
  }

  /* RIGHT */

  .right iframe {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }

  /* RESPONSIVE */

  @media screen and (max-width: 900px) {
    .contact-container {
      grid-template-columns: 1fr;
    }

    .left h1 {
      font-size: 34px;
    }

    .right iframe {
      height: 350px;
    }
  }
`;

export default Contact;