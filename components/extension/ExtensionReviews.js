import { Container, Row, Col } from "react-bootstrap";

import EmptyRow from "../utils/EmptyRow";

const ExtensionReviews = props => {
  return (
    <Container>
      <EmptyRow cls="extension-details-empty-row" />
      <Row>
        <Col md="7" className="mx-auto">
          {props.reviews === undefined || props.reviews.length === 0 ? (
            <Row>
              <Col className="mx-auto" md="auto">
                <img src="/static/images/cat.svg" style={{ width: "60px" }} />
                <br />
                <span className="no-reviews-found">
                  Uh oh. No reviews found!
                </span>
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
      <style jsx global>{`
        .no-reviews-found {
          font-size: 20px;
          letter-spacing: 2px;
        }
      `}</style>
    </Container>
  );
};

export default ExtensionReviews;
