import Link from "next/link";

import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "./utils/DataProvider";
import SpinnerButton from "./utils/SpinnerButton";

const Content = props => (
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
);

export default Content;
