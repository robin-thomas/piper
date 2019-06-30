import { Container, Row, Col } from "react-bootstrap";
import { MDBInput } from "mdbreact";

import SidebarSearch from "./sidebar/SidebarSearch";
import SidebarCategory from "./sidebar/SidebarCategory";
import SidebarRating from "./sidebar/SidebarRating";
import SidebarTitle from "./sidebar/SidebarTitle";

const SidebarLine = () => (
  <Row>
    <Col>
      <p className="sidebar-search-bottom-border">&nbsp;</p>
    </Col>
    <style jsx global>{`
      .sidebar-search-bottom-border {
        border-bottom: 1px solid #dadce0;
      }
    `}</style>
  </Row>
);

const Sidebar = props => (
  <Container className="sidebar">
    <Row>
      <Col>
        <SidebarSearch />
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="sidebar-extension">
          <img src="/static/images/extension.svg" />
          Extensions
        </div>
      </Col>
    </Row>
    <SidebarLine />
    <SidebarTitle title="Categories" />
    <Row>
      <Col>
        <SidebarCategory />
      </Col>
    </Row>
    <SidebarRating />
    <Row>
      <Col>&nbsp;</Col>
    </Row>
    <SidebarLine />
    <Row>
      <Col>
        <span className="sidebar-link">About Piper</span>
      </Col>
    </Row>
    <style jsx global>{`
      .sidebar {
        background: #f5f5f5;
        padding: 12px 15px;
      }

      @media (min-width: 768px) {
        .sidebar {
          height: calc(100vh - 64px);
        }
      }

      .sidebar-extension {
        background: #1a73e8;
        border-radius: 0 100px 100px 0;
        margin-left: -15px;
        margin-top: 10px;
        padding: 10px 15px;
        color: #fff;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
      }

      .sidebar-extension img {
        width: 17px;
        margin-right: 10px;
        margin-top: -3px;
      }

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
  </Container>
);

export default Sidebar;
