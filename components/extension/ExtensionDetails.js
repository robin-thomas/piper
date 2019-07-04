import { MDBInput } from "mdbreact";
import { Row, Col, Form } from "react-bootstrap";

import AdditionalDetails from "./ExtensionAdditionalDetails";
import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import Formatter from "../utils/Formatter";

const ExtensionDetails = props => (
  <div>
    <EmptyRow cls="extension-details-empty-row" />
    <Row>
      <Col md="1"></Col>
      <Col md="8" className="extension-details-overview">
        <Row className="extension-details-title">
          <Col>Overview</Col>
        </Row>
        <EmptyRow />
        <DataConsumer>
          {ctx =>
            ctx.editable === true ? (
              <MDBInput
                type="textarea"
                hint="Extension description"
                valueDefault={
                  ctx.currExt && ctx.currExt.overview
                    ? ctx.currExt.overview
                    : ""
                }
                rows="5"
                onInput={e =>
                  ctx.setCurrExt({ ...ctx.currExt, overview: e.target.value })
                }
                disabled={ctx.textDisabled}
              />
            ) : (
              Formatter.formatText(
                ctx.currExt && ctx.currExt.overview ? ctx.currExt.overview : ""
              )
            )
          }
        </DataConsumer>
      </Col>
      <Col md="3">
        <Row className="extension-details-title">
          <Col>Additional Information</Col>
        </Row>
        <Row>
          <DataConsumer>
            {ctx => (
              <Col>
                <AdditionalDetails name="version" />
                <AdditionalDetails
                  name="updated"
                  value={
                    ctx.currExt && ctx.currExt.updated
                      ? ctx.currExt.updated
                      : null
                  }
                />
                <AdditionalDetails
                  name="size"
                  value={
                    ctx.currExt && ctx.currExt.size ? ctx.currExt.updated : null
                  }
                />
              </Col>
            )}
          </DataConsumer>
        </Row>
      </Col>
    </Row>
    <EmptyRow cls="extension-details-empty-row" />
    <style jsx global>{`
      .extension-details-empty-row {
        height: 100px;
      }

      .extension-details-overview {
        border-right: 2px solid #f1f3f4;
      }

      .extension-details-title {
        font-size: 1.375rem;
        font-weight: 400;
        line-height: 1.75rem;
        color: #202124;
      }
    `}</style>
  </div>
);

export default ExtensionDetails;
