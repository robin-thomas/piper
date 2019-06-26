import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

const Header = () => (
  <Container fluid="true">
    <Row className="header-container">
      <Col className="align-self-center text-center"><img src="/static/images/chrome.svg" />chrome web store</Col>
    </Row>
    <style jsx global>{`
      .header-container {
        background: #fff;
        height: 64px;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.12);
        font-family: 'Roboto', sans-serif;
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
    `}</style>
  </Container>
);

export default Header;
