import { useState, useEffect, useContext } from "react";

import { MDBInput } from "mdbreact";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import ExtensionReviewList from "./ExtensionReviewList";

import { DataConsumer, DataContext } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import PiperContract from "../utils/PiperContract";
import SpinnerButton from "../utils/SpinnerButton";

const ExtensionReviews = ({ hash, reviews }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(null);
  const [addReview, setAddReview] = useState(false);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const submitReview = async ctx => {
    const updatedTime = moment()
      .local()
      .unix();

    // upload it to the contract.
    const { web3, portis, contract } = PiperContract.getWeb3(true);
    try {
      const fn = contract.methods.addReview(hash, rating, review, updatedTime);
      const txHash = await PiperContract.sendSignedTx(web3, portis, fn);
      console.log(txHash);
      const receipt = await PiperContract.getTransactionReceipt(web3, txHash);
      console.log(receipt);

      setAddReview(false);
    } catch (err) {
      console.log(err);

      alert("Failed to add the review!");
    }
  };

  const showAddReview = ctx => {
    if (ctx.address === null) {
      setAddReview(false);
    } else if (ctx.currExt && ctx.currExt.owner === ctx.address) {
      setAddReview(false);
      console.log("owner");
    } else if (reviews.filter(e => e.reviewer === ctx.address).length > 0) {
      setAddReview(false);
    } else {
      setAddReview(true);
    }
  };

  const ctx = useContext(DataContext);
  useEffect(() => showAddReview(ctx), [hash, ctx.address]);

  return (
    <Container>
      <EmptyRow cls="extension-details-empty-row" />
      <Row>
        <DataConsumer>
          {ctx =>
            addReview === true ? (
              <Col md="7" className="mx-auto">
                <Row>
                  <Col className="align-self-center">
                    {review !== null &&
                    review.trim().length > 0 &&
                    rating > 0 ? (
                      <SpinnerButton
                        text="Submit Review"
                        variant="outline-dark"
                        onClick={() => submitReview(ctx)}
                        redirect={false}
                      />
                    ) : (
                      <Button variant="outline-dark" disabled={true}>
                        Submit Review
                      </Button>
                    )}
                  </Col>
                  <Col className="align-self-center ml-auto" md="auto">
                    <StarRatings
                      rating={rating}
                      starRatedColor="black"
                      changeRating={ctx.textDisabled ? null : changeRating}
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
              </Col>
            ) : null
          }
        </DataConsumer>
      </Row>
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
