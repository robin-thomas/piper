import { useState } from "react";

import { Row, Col, Modal, Button, Accordion, Card } from "react-bootstrap";

const SidebarHelp = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <span className="sidebar-link" onClick={() => setShow(true)}>
            Help
          </span>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Do I need to install anything to use Piper?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>
                    You dont have to install anything! You dont even need an
                    account unless you want to upload your extension, or leave a
                    review or rating for an extension.
                  </p>
                  <p>
                    Creating an account is as simple as an email address and a
                    password!
                  </p>
                  <p>
                    We use{" "}
                    <a href="https://www.portis.io/" target="_blank">
                      Portis
                    </a>{" "}
                    to create an account. There is zero account information
                    stored in any servers!
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Does Piper supports 1-click extension install?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>
                    Not exactly. We are limited by Chromium browser limitation
                    which doesn't allow to install extensions hosted outside of
                    Chrome Web store on non-Linux systems &nbsp;
                    <a href="https://developer.chrome.com/extensions/linux_hosting">
                      (Linux Hosting)
                    </a>
                    .
                  </p>
                  <p>
                    Also from Chromium 75 version, extensions that are hosted
                    outside of Chrome Web Store can only be installed in
                    Developer mode. If not, you'll be greeted by the message
                    &nbsp;
                    <a href="https://github.com/oncletom/crx/issues/109">
                      CRX_REQUIRED_PROOF_MISSING
                    </a>
                    .
                  </p>
                  <p>
                    To work around that for Chromium 75+ broswers, we will let
                    you download the extension and you'll have to install the
                    extension in Developer mode.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  What Ethereum network does Piper runs on?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>
                    Currently Piper is running on{" "}
                    <a href="https://ropsten.etherscan.io/" target="_blank">
                      Ropsten network
                    </a>
                    .
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Who can rate/review an extension?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <p>
                    Anyone who logins into Piper, expect the extension uploader.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Error CRX_HEADER_INVALID
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <p>
                    That means the CRX version used to pack the extension and
                    the version supported by your browser are both different.
                  </p>
                  <p>To resolve this:</p>
                  <ul>
                    <li>Unpack downloaded CRX file using 7zip</li>
                    <li>In Chromium extension page, turn ON Developer mode</li>
                    <li>Click "Load unpacked" and select your folder</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  Can I install any extensions?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <p>
                    Kindly refrain from installing these extensions as all are
                    test extensions at the moment.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SidebarHelp;
