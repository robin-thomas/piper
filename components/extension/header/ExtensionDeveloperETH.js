import { MDBInput } from "mdbreact";
import { Row, Col, Button } from "react-bootstrap";

import * as config from "../../../config.json";
import { DataConsumer } from "../../utils/DataProvider";

const ExtensionDeveloperETH = props => (
  <Row>
    <Col md="auto">
      <DataConsumer>
        {ctx =>
          ctx.editable === true ? (
            <MDBInput
              type="text"
              valueDefault={
                ctx.currExt && ctx.currExt.developerETH
                  ? ctx.currExt.developerETH
                  : ""
              }
              hint="Developer ETH address"
              size="sm"
              onChange={e =>
                ctx.setCurrExt({ ...ctx.currExt, developerETH: e.target.value })
              }
              disabled={ctx.textDisabled}
            />
          ) : (
            <Button
              variant="dark"
              href={`https://widget.kyber.network/v0.7.0/?type=pay&mode=tab&receiveAddr=${
                ctx.currExt && ctx.currExt.developerETH
                  ? ctx.currExt.developerETH
                  : ""
              }&receiveToken=ETH&network=${
                config.network.name
              }&lang=en&theme=theme-dark`}
              target="_blank"
              size="sm"
            >
              Tip the Developer
            </Button>
          )
        }
      </DataConsumer>
    </Col>
  </Row>
);

export default ExtensionDeveloperETH;
