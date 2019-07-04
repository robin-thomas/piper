import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";
import TextInput from "../../utils/TextInput";

const ExtensionDeveloper = props => (
  <Row>
    <Col className="extension-header-author">
      <Row>
        <Col md="2" xs="4" className="align-self-center pr-0">
          <span>Offered by:&nbsp;</span>
        </Col>
        <Col md="10" xs="8" className="pl-0">
          <DataConsumer>
            {ctx => (
              <TextInput
                value={
                  ctx.currExt && ctx.currExt.developer
                    ? ctx.currExt.developer
                    : ""
                }
                hint="Developer URL"
                onChange={e =>
                  ctx.setCurrExt({ ...ctx.currExt, developer: e.target.value })
                }
                size="sm"
              />
            )}
          </DataConsumer>
        </Col>
      </Row>
    </Col>
    <style jsx global>{`
      .extension-header .extension-header-author {
        font-size: 0.875rem;
        letter-spacing: 0.01785714em;
        line-height: 1.25rem;
        color: #3c4043;
        font-weight: 400;
      }

      .extension-header-author > a {
        letter-spacing: 0.01785714em;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
        text-decoration: none;
      }
    `}</style>
  </Row>
);

export default ExtensionDeveloper;
