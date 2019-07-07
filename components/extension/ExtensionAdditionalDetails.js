import { Row, Col, Form } from "react-bootstrap";

import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import Formatter from "../utils/Formatter";
import TextInput from "../utils/TextInput";

const AdditionalDetails = ({ name, value }) => {
  const format = (name, data) => {
    // TODO: figure out why its called so much.
    switch (name) {
      case "updated":
        return Formatter.formatDate(1000 * data);
        break;

      case "size":
        return Formatter.formatFileSize(data);
        break;

      default:
        return data;
    }
  };

  return (
    <div>
      <EmptyRow />
      <Row>
        <Col className="extension-details-additional-details-title">{name}</Col>
      </Row>
      <Row>
        <Col className="extension-details-additional-details">
          {name === "version" ? (
            <DataConsumer>
              {ctx => (
                <TextInput
                  value={
                    ctx.currExt && ctx.currExt.version
                      ? ctx.currExt.version
                      : ""
                  }
                  hint="Extension Version"
                  onChange={e =>
                    ctx.setCurrExt({ ...ctx.currExt, version: e.target.value })
                  }
                  size="sm"
                />
              )}
            </DataConsumer>
          ) : (
            <span>{format(name, value)}</span>
          )}
        </Col>
      </Row>
      <style jsx global>{`
        .extension-details-additional-details-title {
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.25rem;
          color: #3c4043;
          letter-spacing: 0.01785714em;
          text-transform: capitalize;
        }

        .extension-details-additional-details {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.25rem;
          color: #5f6368;
        }
      `}</style>
    </div>
  );
};

export default AdditionalDetails;
