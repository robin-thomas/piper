import Link from "next/link";

import { Component } from "react";

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

export default class ExtensionHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      iconURL: this.props.iconURL,
      developer: this.props.developer,
      developerETH: this.props.developerETH
    };
  }

  cancelUpdate = () => {
    this.setState({
      name: this.props.name,
      iconURL: this.props.iconURL,
      developer: this.props.developer,
      developerETH: this.props.developerETH
    });

    this.props.onCancelUpdate();
  };

  updateName = e => {
    e.preventDefault();

    this.setState({
      name: e.target.value
    });
  };

  updateDeveloper = e => {
    e.preventDefault();

    this.setState({
      developer: e.target.value
    });
  };

  updateDeveloperETH = e => {
    e.preventDefault();

    this.setState({
      developerETH: e.target.value
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row className="extension-header" noGutters="true">
          <Col md="1">
            <img src={this.state.iconURL} />
          </Col>
          <Col md="8" className="extension-header-details">
            <Row>
              <Col className="extension-header-name">
                {this.props.editable ? (
                  <MDBInput
                    type="text"
                    valueDefault={this.state.name}
                    hint="Your Extension name"
                    onChange={this.updateName}
                  />
                ) : (
                  this.state.name
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
                    {this.props.editable ? (
                      <MDBInput
                        type="text"
                        valueDefault={this.state.developer}
                        hint="Enter developer URL"
                        size="sm"
                        onChange={this.updateDeveloper}
                      />
                    ) : (
                      <Link href={this.state.developer}>
                        <a target="_blank">{this.state.developer}</a>
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
                      rating={this.props.rating}
                      starRatedColor="black"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="0"
                    />
                    &nbsp;
                    <span className="align-text-top">
                      {prettifyString(this.props.reviews)}
                    </span>
                  </Col>
                  <Col
                    md="auto"
                    className="extension-header-extra-details-border px-0"
                  ></Col>
                  <Col md="auto" className="align-self-center">
                    <ExtensionCategory
                      editable={this.props.editable}
                      category={this.props.category}
                    />
                  </Col>
                  <Col
                    md="auto"
                    className="extension-header-extra-details-border px-0"
                  ></Col>
                  <Col md="auto" className="align-self-center">
                    <img
                      src="/static/images/user.svg"
                      style={{ width: "25px" }}
                    />
                    &nbsp;
                    <span className="align-text-top">
                      {prettifyString(this.props.downloads)} users
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col md="auto" className="ml-auto align-self-center">
                <Row>
                  <Col md="auto">
                    {this.props.editable ? (
                      <MDBInput
                        type="text"
                        valueDefault={this.state.developerETH}
                        hint="Your ETH address"
                        size="sm"
                        onChange={this.updateDeveloperETH}
                      />
                    ) : (
                      <Button
                        variant="outline-dark"
                        href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${this.state.developerETH}&receiveToken=ETH&network=${this.props.network}&lang=en&theme=theme-dark`}
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
                {this.props.editable ? (
                  <div>
                    <Row>
                      <Col>
                        <Button
                          variant="success"
                          onClick={() => this.props.onEditExtension(false)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button variant="danger" onClick={this.cancelUpdate}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : this.props.authorEditable ? (
                  <Button
                    variant="success"
                    onClick={() => this.props.onEditExtension(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button variant="dark">Add to Chrome</Button>
                )}
              </Col>
            </Row>
            <ExtensionUpload
              updateExtensionSize={this.props.updateExtensionSize}
              editable={this.props.editable}
            />
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
            text-transform: capitalize;
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
  }
}
