import { useState } from "react";

import { MDBInput } from "mdbreact";
import { Container, Row, Col, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import ExtensionReviewList from "./ExtensionReviewList";

import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import PiperContract from "../utils/PiperContract";

const ExtensionReviews = ({ hash, reviews }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(null);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const submitReview = async (e, ctx) => {
    e.preventDefault();

    // upload it to the contract.
    const { web3, portis, contract } = PiperContract.getWeb3(true);
    try {
      const fn = contract.methods.addReview(hash, rating, review);
      const txHash = await PiperContract.sendSignedTx(web3, portis, fn);
      console.log(txHash);
      const receipt = await PiperContract.getTransactionReceipt(web3, txHash);
      console.log(receipt);
    } catch (err) {
      console.log(err);

      alert("Failed to add the review!");
    }
  };

  const hasReviewed = ctx => {
    if (reviews.map(e => e.reviewer === ctx.address).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <Container>
      <EmptyRow cls="extension-details-empty-row" />
      <Row>
        <Col md="7" className="mx-auto">
          {reviews === undefined || reviews.length === 0 ? (
            <Row>
              <Col className="mx-auto" md="auto">
                <img src="/static/images/cat.svg" style={{ width: "60px" }} />
                <br />
                <span className="no-reviews-found">
                  Uh oh. No reviews found!
                </span>
              </Col>
            </Row>
          ) : (
            reviews.map((review, index) => (
              <div key={index}>
                <ExtensionReviewList
                  rating={review.rating}
                  review={review.review}
                  updated={review.updated}
                />
                <EmptyRow />
              </div>
            ))
          )}
          <EmptyRow />
          <EmptyRow />
          <EmptyRow />
          <DataConsumer>
            {ctx =>
              ctx.address !== null &&
              ctx.currExt &&
              ctx.currExt.owner !== ctx.address &&
              !hasReviewed(ctx) ? (
                <div>
                  <Row>
                    <Col className="align-self-center">
                      <Button
                        variant="outline-dark"
                        disabled={
                          review !== null && review.length > 0 && rating > 0
                            ? false
                            : true
                        }
                        onClick={e => submitReview(e, ctx)}
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
                  <EmptyRow />
                  <EmptyRow />
                  <EmptyRow />
                </div>
              ) : null
            }
          </DataConsumer>
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
