import { Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import { DataConsumer } from "../../utils/DataProvider";
import Formatter from "../../utils/Formatter";

const ExtensionRating = ({ rating }) => (
  <DataConsumer>
    {ctx => (
      <Col md="auto" className="align-self-center">
        <StarRatings
          rating={rating}
          starRatedColor="black"
          numberOfStars={5}
          name="rating"
          starDimension="15px"
          starSpacing="0"
        />
        &nbsp;
        <span className="align-text-top">{rating}</span>
      </Col>
    )}
  </DataConsumer>
);

export default ExtensionRating;
