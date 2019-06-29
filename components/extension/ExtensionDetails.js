import Link from "next/link";

import { Row, Col, Form } from "react-bootstrap";
import { MDBInput } from "mdbreact";

import { useState, forwardRef, useImperativeHandle } from "react";

import Formatter from "../utils/Formatter";

const ExtensionDetails = forwardRef((props, ref) => {
  const [version_, setVersion] = useState(props.version);
  const [overview_, setOverview] = useState(props.overview);
  const [disableTextFields_, disableTextField] = useState(false);

  const updateVersion = e => {
    e.preventDefault();

    setVersion(e.target.value);
  };

  const updateOverview = e => {
    e.preventDefault();

    setOverview(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      setVersion(props.version);
      setOverview(props.overview);
    },

    disable(status) {
      disableTextField(status);
    },

    details() {
      return {
        version: version_,
        overview: overview_
      };
    }
  }));

  const format = (key, data) => {
    switch (key) {
      case "updated":
        return Formatter.formatDate(data);

      case "extensionSize":
        return Formatter.formatFileSize(data);

      default:
        return data;
    }
  };

  const formatAdditionalDetails = props => {
    const extensionDetails = {
      version: {
        editable: true,
        handler: updateVersion,
        value: version_
      },
      updated: {
        editable: false,
        value: props.updated
      },
      extensionSize: {
        editable: false,
        value: props.extensionSize
      }
    };

    return Object.keys(extensionDetails).map((key, index) => (
      <div key={key}>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className="extension-details-additional-details-title">
            {key}
          </Col>
        </Row>
        <Row>
          <Col className="extension-details-additional-details">
            {props.editable && extensionDetails[key].editable ? (
              <MDBInput
                type="text"
                valueDefault={extensionDetails[key].value}
                hint={`Enter ${key}`}
                size="sm"
                onChange={extensionDetails[key].handler}
                disabled={disableTextFields_}
              />
            ) : (
              format(key, extensionDetails[key].value)
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  return (
    <div>
      <Row className="extension-details-empty-row">
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col md="1"></Col>
        <Col md="8" className="extension-details-overview">
          <Row className="extension-details-title">
            <Col>Overview</Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          {props.editable ? (
            <MDBInput
              type="textarea"
              valueDefault={overview_}
              rows="5"
              onInput={updateOverview}
              disabled={disableTextFields_}
            />
          ) : (
            Formatter.formatText(overview_)
          )}
        </Col>
        <Col md="3">
          <Row className="extension-details-title">
            <Col>Additional Information</Col>
          </Row>
          <Row>
            <Col>{formatAdditionalDetails(props)}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="extension-details-empty-row">
        <Col>&nbsp;</Col>
      </Row>
      <style jsx global>{`
        .extension-details-empty-row {
          height: 100px;
        }

        .extension-details-overview {
          border-right: 2px solid #f1f3f4;
        }

        .extension-details-title {
          font-size: 1.375rem;
          font-weight: 400;
          line-height: 1.75rem;
          color: #202124;
        }

        .extension-details-additional-details-title {
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.25rem;
          color: #3c4043;
          letter-spacing: 0.01785714em;
          text-transform: capitalize;
        }

        .extension-details-additional-details {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.25rem;
          color: #5f6368;
        }
      `}</style>
    </div>
  );
});

export default ExtensionDetails;
