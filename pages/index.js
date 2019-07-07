import { Container, Row, Col } from "react-bootstrap";

import Content from "../components/Content";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import Cache from "../components/utils/Cache";
import GlobalHead from "../components/utils/GlobalHead";
import Apollo from "../components/utils/graphql/Apollo";

const Index = ({ extensions }) => (
  <div>
    <GlobalHead title="Piper | Decentralized Chromium web store" />
    <Header />
    <Container>
      <Row>
        <Col md="3">
          <Sidebar />
        </Col>
        <Col md="9">
          <Content extensions={extensions} />
        </Col>
      </Row>
    </Container>
  </div>
);

Index.getInitialProps = async () => {
  let extensions = [];

  try {
    extensions = await Apollo.getExtensionList();

    if (typeof window !== "undefined") {
      for (const extension of extensions) {
        Cache.set(extension.hash, extension, extension.owner);
      }
    }
  } catch (err) {
    console.log(err);
    extensions = [];
  }

  console.log(extensions);

  return {
    extensions: extensions
  };
};

export default Index;
