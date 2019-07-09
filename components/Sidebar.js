import { useContext } from "react";

import { MDBInput } from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";

import SidebarAbout from "./sidebar/SidebarAbout";
import SidebarCategory from "./sidebar/SidebarCategory";
import SidebarHelp from "./sidebar/SidebarHelp";
import SidebarRating from "./sidebar/SidebarRating";
import SidebarSearch from "./sidebar/SidebarSearch";
import SidebarTitle from "./sidebar/SidebarTitle";

import { DataContext } from "./utils/DataProvider";
import Apollo from "./utils/graphql/Apollo";

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

const Sidebar = props => {
  const ctx = useContext(DataContext);

  const search = args => {
    args.text = args.text !== undefined ? args.text : "";
    args.category = args.category !== undefined ? args.category : "All";
    args.rating = args.rating !== undefined ? args.rating : 0;

    ctx.setExtensions(null);

    Apollo.searchExtensions(args).then(extensions => {
      ctx.setExtensions(extensions);
    });
  };

  return (
    <Container className="sidebar">
      <Row>
        <Col>
          <SidebarSearch onChange={search} />
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
          <SidebarCategory onChange={search} />
        </Col>
      </Row>
      <SidebarRating onChange={search} />
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <SidebarLine />
      <SidebarAbout />
      <SidebarHelp />
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
      `}</style>
    </Container>
  );
};

export default Sidebar;
