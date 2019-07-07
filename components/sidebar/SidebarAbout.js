import { useState } from "react";

import { Row, Col, Modal, Button } from "react-bootstrap";

const SidebarAbout = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <span className="sidebar-link" onClick={() => setShow(true)}>
            About Piper
          </span>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Piper is a decentralized extension store for chromium browsers. No
            servers, nothing to install and no centralized intermediaries
            interfering.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx global>{`
        .sidebar-link {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          color: #80868b;
          display: block;
          margin: 0 0 16px 0;
          text-decoration: none;
          cursor: pointer;
        }

        .sidebar-link:hover {
          color: #1a73e8;
        }
      `}</style>
    </div>
  );
};

export default SidebarAbout;
