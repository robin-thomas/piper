import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

const ExtensionHeader = (props) => (
  <Row className="extension-header">
    <Col md="auto" className="pr-0"><img src={props.iconURI} /></Col>
    <Col md="7" className="extension-header-details">
      <Row><Col className="extension-header-name">{props.name}</Col></Row>
      <Row><Col className="extension-header-author">Offered by: {props.author}</Col></Row>
    </Col>
    <Col md="4"></Col>
    <style jsx global>{`
      .extension-header img {
        width: 60px;
      }

      .extension-header .extension-header-details > .row {
        height: 45px;
      }

      .extension-header .extension-header-name {
        font-size: 1.75rem;
        font-weight: 400;
        line-height: 2.25rem;
        color: #202124;
      }

      .extension-header .extension-header-author {
        font-size: .875rem;
        letter-spacing: .01785714em;
        line-height: 1.25rem;
        color: #3c4043;
        font-weight: 400;
      }
    `}</style>
  </Row>
);

export default ExtensionHeader;
