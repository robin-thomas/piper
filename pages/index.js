import { useContext, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Content from "../components/Content";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import Cache from "../components/utils/Cache";
import GlobalHead from "../components/utils/GlobalHead";
import { DataConsumer, DataContext } from "../components/utils/DataProvider";
import Apollo from "../components/utils/graphql/Apollo";

const Index = ({ extensions }) => {
  const context = useContext(DataContext);

  useEffect(() => {
    context.setExtensions(extensions);
  }, [extensions]);

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Container>
        <Row>
          <Col md="3">
            <Sidebar />
          </Col>
          <Col md="9">
            <DataConsumer>
              {ctx => <Content extensions={ctx.extensions} />}
            </DataConsumer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Index.getInitialProps = async () => {
  let extensions = [];

  try {
    extensions = await Apollo.getExtensionList();

    for (let ext of extensions) {
      const _reviews = await Apollo.getExtensionReviews(ext.hash);
      ext.reviews = _reviews.length;
      if (_reviews.length > 0) {
        ext.rating =
          _reviews.map(e => parseInt(e.rating)).reduce((p, c) => p + c, 0) /
          _reviews.length;

        ext.rating = ext.rating.toFixed(1) * 1;
      }
    }

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
