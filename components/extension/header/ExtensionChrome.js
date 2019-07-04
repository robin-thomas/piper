import { useState } from "react";

import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { Row, Col, Button, Spinner } from "react-bootstrap";

import Chrome from "../../utils/Chrome";
import { DataConsumer } from "../../utils/DataProvider";
import SpinnerButton from "../../utils/SpinnerButton";

const ExtensionChrome = props => {
  const [modal, setModal] = useState(false);
  const [chromeLink, setChromeLink] = useState(null);

  const load = async ctx => {
    try {
      const app = await Chrome.get(chromeLink);
      console.log(app);

      ctx.setCurrExt({
        ...ctx.currExt,
        name: app.name,
        developer: app.url,
        version: app.version,
        iconURL: app.image
      });

      setModal(!modal);
    } catch (err) {
      console.log(err);

      throw new Error(
        "Some error happened while trying to retrieve details from chrome web store"
      );
    }
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
            <DataConsumer>
              {ctx => (
                <SpinnerButton
                  variant="outline-dark"
                  text="Load"
                  disabled={chromeLink === null}
                  onClick={() => load(ctx)}
                />
              )}
            </DataConsumer>
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
