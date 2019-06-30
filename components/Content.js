import Link from "next/link";

import { Row, Col, Button } from "react-bootstrap";

import { DataConsumer } from "./utils/DataProvider";

const Content = props => (
  <Row>
    <DataConsumer>
      {context => (
        <Col md="auto" className="ml-auto">
          {context.loggedIn === true ? (
            <Link href="extensions?hash=new" as="extensions/new">
              <a>
                <Button variant="success" disabled={!context.loggedIn}>
                  Add New Extension
                </Button>
              </a>
            </Link>
          ) : null}
        </Col>
      )}
    </DataConsumer>
  </Row>
);

export default Content;
