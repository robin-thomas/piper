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
    {props.extensions === null ? (
      <Row style={{ height: "350px" }}>
        <Col className="align-self-center text-center mx-auto" md="4">
          <div>
            <img
              src="/static/images/loading.svg"
              style={{ width: "150px", marginBottom: "20px" }}
            />
          </div>
        </Col>
      </Row>
    ) : props.extensions.length === 0 ? (
      <Row style={{ height: "350px" }}>
        <Col
          className="content-extensions-empty-col align-self-center text-center mx-auto"
          md="4"
        >
          <div>
            <img
              src="/static/images/search.svg"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <p className="content-extensions-empty">No Results Found</p>
            <p>
              <i>
                We searched far and wide and couldnt find any <b>extensions</b>{" "}
                matching your search
              </i>
            </p>
          </div>
        </Col>
      </Row>
    ) : (
      <Row>
        {props.extensions.map((extension, index) => (
          <Col md="3" key={index}>
            <ExtensionList
              name={extension.name}
              rating={extension.rating}
              iconURL={extension.iconURL}
              hash={extension.hash}
            />
          </Col>
        ))}
      </Row>
    )}
    <style jsx global>{`
      .content-extensions-empty-col {
        border: 10px solid black;
        border-radius: 100%;
        padding: 20px;
      }

      .content-extensions-empty {
        font-size: 18px;
        font-weight: 900;
        text-transform: uppercase;
      }
    `}</style>
  </Container>
);

export default Content;
