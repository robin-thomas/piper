import { useState } from "react";

import { Row, Col, Button, Spinner } from "react-bootstrap";
import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import Chrome from "../utils/Chrome";
// import Chrome from "chrome-web-store-item-property";

const ExtensionChrome = props => {
  const [modal, setModal] = useState(false);
  const [chromeLink, setChromeLink] = useState(
    "nimelepbpejjlbmoobocpfnjhihnpked"
  );
  const [disableLoadButton_, disableLoadButton] = useState(false);

  const load = async e => {
    e.preventDefault();

    if (chromeLink === null) {
      alert("Please input a valid chrome extension id");
      return;
    }

    disableLoadButton(true);
    try {
      const app = await Chrome.get(chromeLink);
      console.log(app);
    } catch (err) {
      alert(
        "Some error happened while trying to retrieve details from chrome web store"
      );
    }

    disableLoadButton(false);
  };

  return (
    <Row>
      <Col>
        <MDBModal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
          <MDBModalHeader toggle={() => setModal(!modal)}>
            Load from Chrome web store
          </MDBModalHeader>
          <MDBModalBody>
            <Row noGutters="true">
              <Col
                md="auto"
                className="align-self-center"
                style={{ fontSize: "14.875px", fontWeight: "500" }}
              >
                https://chrome.google.com/webstore/detail/extension_name/
              </Col>
              <Col>
                <MDBInput
                  type="text"
                  valueDefault={chromeLink ? chromeLink : ""}
                  size="sm"
                  onChange={e => setChromeLink(e.target.value)}
                />
              </Col>
            </Row>
          </MDBModalBody>
          <MDBModalFooter>
            <Button
              variant="outline-dark"
              onClick={load}
              disabled={disableLoadButton_}
            >
              <Spinner
                animation={`${disableLoadButton_ ? "border" : null}`}
                size="sm"
                role="status"
              />
              <span
                style={{
                  display: `${disableLoadButton_ ? "none" : "inline"}`
                }}
              >
                Load
              </span>
            </Button>
          </MDBModalFooter>
        </MDBModal>

        <Button variant="outline-dark" onClick={() => setModal(!modal)}>
          From Chrome
        </Button>
      </Col>
    </Row>
  );
};

export default ExtensionChrome;
