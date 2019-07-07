import { useState } from "react";

import { MDBInput } from "mdbreact";
import { Row, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import SidebarTitle from "./SidebarTitle";
import { DataConsumer } from "../utils/DataProvider";

const SidebarRatingItem = ({ rating, currentRating, onUpdate }) => (
  <Row className="sidebar-ratings-radio-button">
    <Col md="2" xs="2">
      <MDBInput
        type="radio"
        size="sm"
        checked={rating === currentRating ? true : false}
        onChange={() => onUpdate(rating)}
      />
    </Col>
    <Col md="auto" xs="4" className="px-0">
      <StarRatings
        rating={rating}
        starRatedColor="black"
        numberOfStars={5}
        name="rating"
        starDimension="15px"
        starSpacing="0"
      />
    </Col>
    <Col md="4" xs="4" className="align-self-center">
      {rating !== 5 ? "& up" : null}
    </Col>
    <style jsx global>{`
      .sidebar-ratings-radio-button {
        height: 30px;
        padding-top: 5px;
      }

      .sidebar-ratings-radio-button .my-3 {
        margin-bottom: 0 !important;
        margin-top: 6px !important;
      }

      .sidebar-ratings-radio-button .form-check {
        padding-left: 0 !important;
      }

      .sidebar-ratings-radio-button .form-control-sm {
        height: 18px;
        margin-top: 0 !important;
        margin-left: 0 !important;
        width: 18px;
        box-shadow: none !important;
      }
    `}</style>
  </Row>
);

const SidebarRating = ({ onChange }) => {
  const submit = (val, ctx) => {
    const search = { ...ctx.search, rating: val };
    ctx.setSearch(search);
    onChange(search);
  };

  return (
    <DataConsumer>
      {ctx => (
        <div>
          <SidebarTitle
            title="Ratings"
            clear={ctx.search && ctx.search.rating > 0 ? true : false}
            onClearClick={() => submit(0, ctx)}
          />
          <SidebarRatingItem
            rating={5}
            currentRating={
              ctx.search && ctx.search.rating ? ctx.search.rating : 0
            }
            onUpdate={() => submit(5, ctx)}
          />
          <SidebarRatingItem
            rating={4}
            currentRating={
              ctx.search && ctx.search.rating ? ctx.search.rating : 0
            }
            onUpdate={() => submit(4, ctx)}
          />
          <SidebarRatingItem
            rating={3}
            currentRating={
              ctx.search && ctx.search.rating ? ctx.search.rating : 0
            }
            onUpdate={() => submit(3, ctx)}
          />
          <SidebarRatingItem
            rating={2}
            currentRating={
              ctx.search && ctx.search.rating ? ctx.search.rating : 0
            }
            onUpdate={() => submit(2, ctx)}
          />
          <SidebarRatingItem
            rating={1}
            currentRating={
              ctx.search && ctx.search.rating ? ctx.search.rating : 0
            }
            onUpdate={() => submit(1, ctx)}
          />
        </div>
      )}
    </DataConsumer>
  );
};

export default SidebarRating;
