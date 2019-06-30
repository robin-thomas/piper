import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

import GlobalHead from "../components/utils/GlobalHead";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

export default () => (
  <div>
    <GlobalHead title="Piper | Decentralized Chromium web store" />
    <Header />
    <Container>
      <Row>
        <Col md="3">
          <Sidebar />
        </Col>
        <Col>
          <Content />
        </Col>
      </Row>
    </Container>
  </div>
);
