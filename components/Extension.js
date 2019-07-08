import { Container, Tab, Row, Col, Nav } from "react-bootstrap";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";
import ExtensionReviews from "./extension/ExtensionReviews";

import EmptyRow from "./utils/EmptyRow";

const Extension = ({ hash, reviews }) => (
  <Container>
    <ExtensionHeader />
    <EmptyRow />
    {hash === "new" ? (
      <div>
        <ExtensionImageSlider
          images={[
            "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
            "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
          ]}
        />
        <ExtensionDetails />
      </div>
    ) : (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col md="4" className="text-center mx-auto">
            <Nav fill className="justify-content-center" variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="first">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ExtensionImageSlider
                  images={[
                    "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
                    "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
                  ]}
                />
                <ExtensionDetails />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ExtensionReviews
                  hash={hash}
                  reviews={[
                    { updated: 1562626318, rating: 3, review: "hello all" },
                    { rating: 4, review: "hello bb all" }
                  ]}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )}
  </Container>
);

export default Extension;
