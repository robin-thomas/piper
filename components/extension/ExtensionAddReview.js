import { useState, useEffect, useContext } from "react";

import { MDBInput } from "mdbreact";
import moment from "moment";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import { DataConsumer, DataContext } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import PiperContract from "../utils/PiperContract";

const ExtensionAddReview = ({ hash, setAddReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const checkShowAddReviewButton = (rating_, review_) => {
    if (rating_ > 0 && review_ !== null && review_.trim().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(null);
    }
  };

  const changeRating = newRating => {
    setRating(newRating);
    checkShowAddReviewButton(newRating, review);
  };

  const checkReview = newReview => {
    setReview(newReview);
    checkShowAddReviewButton(rating, newReview);
  };

  const submitReview = async (e, ctx) => {
    e.preventDefault();

    setDisabled(true);
    ctx.setTextDisabled(true);

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
      setDisabled(null);
    } catch (err) {
      console.log(err);

      alert("Failed to add the review!");
      setDisabled(false);
    }

    ctx.setTextDisabled(false);
  };

  return (
    <Row>
      <Col md="7" className="mx-auto">
        <EmptyRow />
        <EmptyRow />
        <EmptyRow />
        <Row>
          <Col className="align-self-center">
            <DataConsumer>
              {ctx => (
                <Button
                  variant="outline-dark"
                  onClick={e => submitReview(e, ctx)}
                  disabled={ctx.textDisabled || disabled || disabled === null}
                >
                  <Spinner
                    animation={`${disabled ? "border" : null}`}
                    size="sm"
                    role="status"
                  />
                  <span
                    style={{
                      display: `${disabled ? "none" : "inline"}`
                    }}
                  >
                    Submit Review
                  </span>
                </Button>
              )}
            </DataConsumer>
          </Col>
          <Col className="align-self-center ml-auto" md="auto">
            <DataConsumer>
              {ctx => (
                <StarRatings
                  rating={rating}
                  starRatedColor="black"
                  changeRating={ctx.textDisabled ? null : changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
              )}
            </DataConsumer>
          </Col>
        </Row>
        <Row>
          <Col>
            <MDBInput
              type="textarea"
              hint="Add your review"
              rows="5"
              value={review !== null ? review : ""}
              onChange={e => checkReview(e.target.value)}
              disabled={false}
            />
          </Col>
        </Row>
        <EmptyRow />
        <EmptyRow />
        <EmptyRow />
      </Col>
    </Row>
  );
};

export default ExtensionAddReview;
