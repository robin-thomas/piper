import Link from "next/link";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";

import ExtensionCategory from "./ExtensionCategory";

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
      <Col md="9" className="extension-header-details">
        <Row>
          <Col className="extension-header-name">{props.name}</Col>
        </Row>
        <Row>
          <Col className="extension-header-author">
            <Row>
              <Col md="auto" className="align-self-center pr-0">
                <span>Offered by:&nbsp;</span>
              </Col>
              <Col md="5">
                {props.editable ? (
                  <Form.Group style={{ marginBottom: "0px" }}>
                    <Form.Control
                      size="sm"
                      type="text"
                      defaultValue={props.author}
                      placeholder="Enter author URL"
                    />
                  </Form.Group>
                ) : (
                  <Link href={props.author}>
                    <a target="_blank">{props.author}</a>
                  </Link>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="extension-header-extra-details" noGutters="true">
          <Col md="8" className="align-self-center">
            <Row>
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
                <ExtensionCategory
                  editable={props.editable}
                  category={props.category}
                />
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
            </Row>
          </Col>
          <Col md="auto" className="align-self-center">
            <Row>
              <Col md="auto">
                {props.editable ? (
                  <Form.Group style={{ marginBottom: "0px" }}>
                    <Form.Control
                      size="sm"
                      type="text"
                      defaultValue={props.developerETH}
                      placeholder="Your ETH address"
                    />
                  </Form.Group>
                ) : (
                  <Button
                    variant="outline-dark"
                    href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${props.developerETH}&receiveToken=ETH&network=${props.network}&lang=en&theme=theme-dark`}
                    target="_blank"
                  >
                    Tip the Developer
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
      </Col>
      <Col md="2" className="text-right">
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
        height: 40px;
      }

      .extension-header .extension-header-details > .row:last-child {
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
