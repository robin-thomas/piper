import Link from "next/link";

import { useState } from "react";

import { Row, Col, Button, Spinner } from "react-bootstrap";

import { DataConsumer } from "./utils/DataProvider";

const Content = props => {
  const [disableAddNewButton_, disableAddNewButton] = useState(false);

  const save = e => {
    disableAddNewButton(true);
  };

  return (
    <Row>
      <DataConsumer>
        {context => (
          <Col md="auto" className="ml-auto">
            {context.loggedIn === true ? (
              <Link href="extensions?hash=new" as="extensions/new">
                <a>
                  <Button
                    variant="success"
                    onClick={save}
                    disabled={disableAddNewButton_}
                  >
                    <Spinner
                      animation={`${disableAddNewButton_ ? "border" : null}`}
                      size="sm"
                      role="status"
                    />
                    <span
                      style={{
                        display: `${disableAddNewButton_ ? "none" : "inline"}`
                      }}
                    >
                      Add New Extension
                    </span>
                  </Button>
                </a>
              </Link>
            ) : null}
          </Col>
        )}
      </DataConsumer>
    </Row>
  );
};

export default Content;
