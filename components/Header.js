import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

const Header = () => (
  <Container fluid="true">
    <Row className="header-container">
      <Col className="align-self-center">
        <Container>
          <Row>
            <Col>
              <img src="/static/images/chrome.svg" />
              <span>chrome web store</span>
            </Col>
            <Col className="align-self-center sign-in text-right">
              <img
                src="/static/images/settings.svg"
                style={{ width: "20px" }}
              />
              <span>Sign in</span>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
    <style jsx global>{`
      .header-container {
        background: #fff;
        height: 64px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
        font-size: 1.375rem;
        font-weight: 400;
        line-height: 1.75rem;
        color: #5f6368;
        letter-spacing: 0px;
      }

      .header-container img {
        width: 30px;
        margin-right: 10px;
      }

      .sign-in {
        color: #5f6368;
        cursor: pointer;
        letter-spacing: 0.01428571em;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.25rem;
      }
    `}</style>
  </Container>
);

export default Header;
