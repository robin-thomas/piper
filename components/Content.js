import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

import ExtensionList from "./content/ExtensionList";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

import { DataConsumer } from "./utils/DataProvider";
import EmptyRow from "./utils/EmptyRow";
import SpinnerButton from "./utils/SpinnerButton";

const Content = props => (
  <Container fluid="true" style={{ padding: "0" }}>
    <Row>
      <Col md="auto" className="ml-auto">
        <DataConsumer>
          {ctx =>
            ctx.loggedIn === true ? (
              <Link href="extensions?hash=new" as="extensions/new">
                <a>
                  <SpinnerButton variant="success" text="Add New Extension" />
                </a>
              </Link>
            ) : null
          }
        </DataConsumer>
      </Col>
    </Row>
    <ExtensionImageSlider
      images={[
        "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
        "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
      ]}
    />
    <EmptyRow cls="sidebar-search-bottom-border" />
    <EmptyRow />
    <Row>
      {props.extensions.map(extension => (
        <Col md="3" key={extension.hash}>
          <ExtensionList
            name={extension.name}
            rating={extension.rating}
            iconURL={extension.iconURL}
            hash={extension.hash}
          />
        </Col>
      ))}
    </Row>
  </Container>
);

export default Content;
