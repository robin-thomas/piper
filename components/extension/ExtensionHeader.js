import Link from "next/link";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";

import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
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

const ExtensionHeader = forwardRef((props, ref) => {
  const extensionCategoryRef = useRef(null);
  const extensionUploadRef = useRef(null);

  const [name_, setName] = useState(props.name);
  const [iconURL_, setIconURL] = useState(props.iconURL);
  const [developer_, setDeveloper] = useState(props.developer);
  const [developerETH_, setDeveloperETH] = useState(props.developerETH);
  const [disableSaveButton_, disableSaveButton] = useState(false);
  const [disableCancelButton_, disableCancelButton] = useState(false);
  const [disableTextFields_, disableTextFields] = useState(false);

  const save = e => {
    e.preventDefault();

    props.onEditExtension(false, true);
  };

  const disable_ = status => {
    disableSaveButton(status);
    disableCancelButton(status);
    disableTextFields(status);

    // Child components.
    extensionUploadRef.current.disable(status);
    extensionCategoryRef.current.disable(status);
  };

  const updateName = e => {
    e.preventDefault();

    setName(e.target.value);
  };

  const updateDeveloper = e => {
    e.preventDefault();

    setDeveloper(e.target.value);
  };

  const updateDeveloperETH = e => {
    e.preventDefault();

    setDeveloperETH(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      extensionCategoryRef.current.reset();
      extensionUploadRef.current.reset();

      setName(props.name);
      setIconURL(props.iconURL);
      setDeveloper(props.developer);
      setDeveloperETH(props.developerETH);
    },

    disable(status) {
      disable_(status);
    },

    details() {
      const extensionCategoryDetails = extensionCategoryRef.current.details();

      return {
        name: name_,
        iconURL: iconURL_,
        developer: developer_,
        developerETH: developerETH_,
        ...extensionCategoryDetails
      };
    }
  }));

  return (
    <div>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row className="extension-header" noGutters="true">
        <Col md="1" xs="2">
          <img src={iconURL_} />
        </Col>
        <Col md="8" xs="10" className="extension-header-details">
          <Row>
            <Col className="extension-header-name">
              {props.editable ? (
                <MDBInput
                  type="text"
                  valueDefault={name_}
                  hint="Your Extension name"
                  onChange={updateName}
                  disabled={disableTextFields_}
                />
              ) : (
                name_
              )}
            </Col>
          </Row>
          <Row>
            <Col className="extension-header-author">
              <Row>
                <Col md="2" className="align-self-center pr-0">
                  <span>Offered by:&nbsp;</span>
                </Col>
                <Col md="10" className="pl-0">
                  {props.editable ? (
                    <MDBInput
                      type="text"
                      valueDefault={developer_}
                      hint="Your website URL"
                      size="sm"
                      onChange={updateDeveloper}
                      disabled={disableTextFields_}
                    />
                  ) : (
                    <Link href={developer_}>
                      <a target="_blank">{developer_}</a>
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
                    ref={extensionCategoryRef}
                    editable={props.editable}
                    category={props.category}
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
                      valueDefault={developerETH_}
                      hint="Your ETH address"
                      size="sm"
                      onChange={updateDeveloperETH}
                      disabled={disableTextFields_}
                    />
                  ) : (
                    <Button
                      variant="outline-dark"
                      href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${developerETH_}&receiveToken=ETH&network=${props.network}&lang=en&theme=theme-dark`}
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
                <div>
                  <Row>
                    <Col>
                      <Button
                        variant="success"
                        onClick={save}
                        disabled={disableSaveButton_}
                      >
                        <Spinner
                          animation={`${disableSaveButton_ ? "border" : null}`}
                          size="sm"
                          role="status"
                        />
                        <span
                          style={{
                            display: `${disableSaveButton_ ? "none" : "inline"}`
                          }}
                        >
                          Save
                        </span>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={props.parentReset}
                        disabled={disableCancelButton_}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </div>
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
          <ExtensionUpload
            ref={extensionUploadRef}
            updateExtensionSize={props.updateExtensionSize}
            updateExtensionCrx={props.updateExtensionCrx}
            editable={props.editable}
            disableParent={disable_}
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
});

export default ExtensionHeader;
