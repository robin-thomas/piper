import { useState } from "react";

import { MDBInput } from "mdbreact";
import { Container, Row, Col, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";

const ExtensionReviews = props => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(null);

  const changeRating = newRating => {
    setRating(newRating);
  };

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
          <EmptyRow />
          <EmptyRow />
          <EmptyRow />
          <Row>
            <Col className="align-self-center">
              <Button
                variant="outline-dark"
                disabled={
                  review !== null && review.length > 0 && rating > 0
                    ? false
                    : true
                }
              >
                Submit Review
              </Button>
            </Col>
            <Col className="align-self-center ml-auto" md="auto">
              <StarRatings
                rating={rating}
                starRatedColor="black"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="25px"
                starSpacing="5px"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <MDBInput
                type="textarea"
                hint="Add your review"
                rows="5"
                value={review !== null ? review : ""}
                onChange={e => setReview(e.target.value)}
                disabled={false}
              />
            </Col>
          </Row>
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
