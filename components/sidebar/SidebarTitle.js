import { Row, Col } from "react-bootstrap";

import EmptyRow from "../utils/EmptyRow";

const SidebarTitle = ({ title, clear, onClearClick }) => (
  <div>
    <EmptyRow />
    <Row>
      <Col className="sidebar-title">
        <span>{title}</span>
      </Col>
      <Col className="ml-auto text-right">
        <span className="sidebar-title-clear" onClick={onClearClick}>
          {clear ? "Clear" : null}
        </span>
      </Col>
    </Row>
    <style jsx global>{`
      .sidebar-title > span {
        color: #3c4043;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.43;
        letter-spacing: 0.2px;
        text-transform: capitalize;
      }

      .sidebar-title-clear {
        letter-spacing: 0.01785714em;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
        color: #1a73e8;
        cursor: pointer;
      }
    `}</style>
  </div>
);

export default SidebarTitle;
