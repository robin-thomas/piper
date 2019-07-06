import { MDBInput } from "mdbreact";
import { Row, Col, Button } from "react-bootstrap";

import * as config from "../../../config.json";
import { DataConsumer } from "../../utils/DataProvider";

const ExtensionDeveloperETH = props => (
  <Row>
    <Col md="auto">
      <DataConsumer>
        {ctx =>
          ctx.editable !== true ? (
            <Button
              variant="dark"
              href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${
                ctx.currExt && ctx.currExt.owner ? ctx.currExt.owner : ""
              }&receiveToken=ETH&network=${
                config.network.name
              }&lang=en&theme=theme-dark`}
              target="_blank"
              size="sm"
            >
              Tip the Developer
            </Button>
          ) : null
        }
      </DataConsumer>
    </Col>
  </Row>
);

export default ExtensionDeveloperETH;
