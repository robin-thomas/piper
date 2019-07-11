import { Container, Row, Col } from "react-bootstrap";

import ExtensionReviewList from "./ExtensionReviewList";
import EmptyRow from "../utils/EmptyRow";

const ExtensionReviews = ({ hash, reviews }) => {
  return (
    <Container>
      <EmptyRow cls="extension-details-empty-row" />
      <Row>
        {reviews === undefined || reviews.length === 0 ? (
          <Col md="7" className="mx-auto">
            <Row>
              <Col className="mx-auto" md="auto">
                <img src="/static/images/cat.svg" style={{ width: "60px" }} />
                <br />
                <span className="no-reviews-found">
                  Uh oh. No reviews found!
                </span>
              </Col>
            </Row>
          </Col>
        ) : (
          reviews.map((review, index) => (
            <Col md="auto" key={index}>
              <ExtensionReviewList
                rating={review.rating}
                review={review.review}
                updated={review.updated}
                reviewer={review.reviewer}
              />
            </Col>
          ))
        )}
      </Row>
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
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
