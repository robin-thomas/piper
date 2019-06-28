import Link from "next/link";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MDBInput } from "mdbreact";
import StarRatings from "react-star-ratings";

import ExtensionCategory from "./ExtensionCategory";
import ExtensionUpload from "./ExtensionUpload";

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
      <Col md="8" className="extension-header-details">
        <Row>
          <Col className="extension-header-name">
            {props.editable ? (
              <MDBInput
                type="text"
                valueDefault={props.name}
                hint="Your Extension name"
              />
            ) : (
              props.name
            )}
          </Col>
        </Row>
        <Row>
          <Col className="extension-header-author">
            <Row>
              <Col md="auto" className="align-self-center pr-0">
                <span>Offered by:&nbsp;</span>
              </Col>
              <Col md="5">
                {props.editable ? (
                  <MDBInput
                    type="text"
                    valueDefault={props.author}
                    hint="Enter author URL"
                    size="sm"
                  />
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
          <Col md="auto" className="align-self-center">
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
          <Col md="auto" className="ml-auto align-self-center">
            <Row>
              <Col md="auto">
                {props.editable ? (
                  <MDBInput
                    type="text"
                    valueDefault={props.developerETH}
                    hint="Your ETH address"
                    size="sm"
                  />
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
      <Col md="2" className="ml-auto text-right">
        <Row>
          <Col>
            {props.editable ? (
              <Button
                variant="success"
                onClick={() => props.onEditExtension(false)}
              >
                Save
              </Button>
            ) : props.authorEditable ? (
              <Button
                variant="success"
                onClick={() => props.onEditExtension(true)}
              >
                Edit
              </Button>
            ) : (
              <Button variant="dark">Add to Chrome</Button>
            )}
          </Col>
        </Row>
        <ExtensionUpload editable={props.editable} />
      </Col>
    </Row>
    <style jsx global>{`
      .extension-header {
        border-bottom: 2px solid #f1f3f4;
      }

      .extension-header img {
        width: 60px;
      }

      .extension-header .extension-header-details > .row:first-child {
        height: 50px;
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
