import Link from "next/link";

import { Component } from "react";

import moment from "moment";

import { Row, Col, Form } from "react-bootstrap";
import { MDBInput } from "mdbreact";

const formatAdditionalDetails = props => {
  const keys = {
    version: true,
    updated: false,
    size: false
  };

  return Object.keys(keys).map((key, index) => (
    <div key={index}>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col className="extension-details-additional-details-title">{key}</Col>
      </Row>
      <Row>
        <Col className="extension-details-additional-details">
          {props.editable && keys[key] ? (
            <MDBInput
              type="text"
              valueDefault={props[key]}
              hint={`Enter ${key}`}
              size="sm"
            />
          ) : (
            format(key, props[key])
          )}
        </Col>
      </Row>
    </div>
  ));
};

const format = (key, data) => {
  switch (key) {
    case "updated":
      return Formatter.formatDate(data);

    case "size":
      return Formatter.formatFileSize(data);

    default:
      return data;
  }
};

const Formatter = {
  formatData: data => {
    if (data === undefined) {
      return;
    }

    data = data.replace(/\r?\n/g, "<br />");
    data = data.split("<br />");

    return data.map((line, index) => (
      <p key={index}>
        {line}
        <br />
      </p>
    ));
  },

  formatDate: timestamp => {
    return moment(timestamp)
      .local()
      .format("MMM DD, YYYY");
  },

  formatFileSize: bytes => {
    const size = ["B", "kB", "MB", "GB"];
    const factor = Math.floor((bytes.toString().length - 1) / 3);
    return (bytes / Math.pow(1024, factor)).toFixed(2) + size[factor];
  }
};

const ExtensionDetails = props => (
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
          <MDBInput type="textarea" valueDefault={props.overview} rows="5" />
        ) : (
          Formatter.formatData(props.overview)
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

export default ExtensionDetails;
