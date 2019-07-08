import { Row, Col, Card } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import Timer from "../utils/Timer";

const ExtensionReviewList = ({ rating, review, updated }) => {
  const choices = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info"
  ];
  const choice = choices[Math.floor(Math.random() * choices.length)];

  return (
    <Card bg={choice} text="black" style={{ padding: "10px" }}>
      <Row>
        <Col>
          <Card.Img
            variant="top"
            src="/static/images/user.svg"
            style={{ width: "50px" }}
          />
        </Col>
        <Col className="ml-auto text-right">
          <Timer time={1000 * updated} />
        </Col>
      </Row>
      <Card.Body style={{ padding: "1.25rem 0.7rem" }}>
        <Card.Text style={{ color: "#000" }}>{review}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExtensionReviewList;
