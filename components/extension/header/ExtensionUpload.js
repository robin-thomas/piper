import { MDBProgress } from "mdbreact";
import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";
import SpinnerButton from "../../utils/SpinnerButton";

const ExtensionUpload = props => {
  const fakeUpload = e => {
    e.preventDefault();
    document.getElementById("uploadExtension").click();
  };

  const uploadExtension = (e, ctx) => {
    ctx.setTextDisabled(true);

    const r = new FileReader();
    r.onload = () => {
      ctx.setCurrExt({
        ...ctx.currExt,
        size: r.result.byteLength,
        crx: Buffer.from(r.result)
      });
      ctx.setTextDisabled(false);
    };
    r.onprogress = async data => {
      ctx.setExtUploadProgress(parseInt((data.loaded / data.total) * 100));
    };
    r.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <div>
      <Row>
        <Col>
          <DataConsumer>
            {ctx =>
              ctx.editable === true ? (
                <div>
                  <input
                    id="uploadExtension"
                    name="myname"
                    type="file"
                    hidden
                    onChange={e => uploadExtension(e, ctx)}
                  />
                  <SpinnerButton
                    variant="dark"
                    text="Upload .crx"
                    onClick={fakeUpload}
                  />
                </div>
              ) : null
            }
          </DataConsumer>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataConsumer>
            {ctx =>
              ctx.editable === true ? (
                <MDBProgress
                  className="my-2"
                  material
                  value={ctx.extUploadProgress}
                  color="dark"
                  height="3px"
                />
              ) : null
            }
          </DataConsumer>
        </Col>
      </Row>
    </div>
  );
};

export default ExtensionUpload;
