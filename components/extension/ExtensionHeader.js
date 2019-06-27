import Link from "next/link";

import { Container, Row, Col, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";

const prettifyString = str => {
  if (str === undefined) {
    return "0";
  } else {
    return parseInt(str).toLocaleString();
  }
};

const ExtensionHeader = props => (
  <div>
    <Row>
      <Col>&nbsp;</Col>
    </Row>
    <Row className="extension-header" noGutters="true">
      <Col md="1">
        <img src={props.iconURI} />
      </Col>
      <Col md="7" className="extension-header-details">
        <Row>
          <Col className="extension-header-name">{props.name}</Col>
        </Row>
        <Row>
          <Col className="extension-header-author">
            Offered by:&nbsp;
            <Link href={props.author}>
              <a>{props.author}</a>
            </Link>
          </Col>
        </Row>
        <Row className="extension-header-extra-details">
          <Col md="auto" className="align-self-center">
            <StarRatings
              rating={props.rating}
              starRatedColor="black"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="0"
            />
            &nbsp;
            <span className="align-text-top">
              {prettifyString(props.reviews)}
            </span>
          </Col>
          <Col
            md="auto"
            className="extension-header-extra-details-border px-0"
          ></Col>
          <Col md="auto" className="align-self-center">
            {props.category}
          </Col>
          <Col
            md="auto"
            className="extension-header-extra-details-border px-0"
          ></Col>
          <Col md="auto" className="align-self-center">
            <img src="/static/images/user.svg" style={{ width: "25px" }} />
            &nbsp;
            <span className="align-text-top">
              {prettifyString(props.downloads)} users
            </span>
          </Col>
          <Col md="4">
            {props.developerETH !== undefined ? (
              <Button
                variant="outline-dark"
                href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${props.developerETH}&receiveToken=ETH&network=${props.network}&lang=en&theme=theme-dark`}
                target="_blank"
              >
                Tip the Developer
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
      </Col>
      <Col md="4" className="text-right">
        <Button variant="dark">Add to Chrome</Button>
      </Col>
    </Row>
    <style jsx global>{`
      .extension-header {
        border-bottom: 2px solid #f1f3f4;
      }

      .extension-header img {
        width: 60px;
      }

      .extension-header .extension-header-details > .row {
        height: 45px;
      }

      .extension-header .extension-header-details > .row:nth-child(3) {
        height: 25px;
      }

      .extension-header .extension-header-name {
        font-size: 1.75rem;
        font-weight: 400;
        line-height: 2.25rem;
        color: #202124;
      }

      .extension-header .extension-header-author {
        font-size: 0.875rem;
        letter-spacing: 0.01785714em;
        line-height: 1.25rem;
        color: #3c4043;
        font-weight: 400;
      }

      .extension-header-author > a {
        letter-spacing: 0.01785714em;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
        text-decoration: none;
      }

      .extension-header-extra-details-border {
        border-right: 1px solid #9aa0a6;
      }

      .extension-header-extra-details {
        letter-spacing: 0.01785714em;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #5f6368;
      }
    `}</style>
  </div>
);

export default ExtensionHeader;
