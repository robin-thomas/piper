import { Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";
import Formatter from "../../utils/Formatter";

const ExtensionDownloads = props => (
  <DataConsumer>
    {ctx => (
      <Col md="auto" className="align-self-center">
        <img src="/static/images/user.svg" style={{ width: "25px" }} />
        &nbsp;
        <span className="align-text-top">
          {Formatter.prettifyString(
            ctx.currExt && ctx.currExt.downloads ? ctx.currExt.downloads : "0"
          )}{" "}
          users
        </span>
      </Col>
    )}
  </DataConsumer>
);

export default ExtensionDownloads;
