import Router from "next/router";

import { useContext } from "react";

import { MDBProgress } from "mdbreact";
import { Row, Col } from "react-bootstrap";

import { DataConsumer, DataContext } from "../../utils/DataProvider";
import SpinnerButton from "../../utils/SpinnerButton";

const ExtensionUpload = props => {
  const fakeUpload = async ctx => {
    document.getElementById("uploadExtension").click();
  };

  const uploadExtension = (e, ctx) => {
    return new Promise((resolve, reject) => {
      ctx.setExtUploadProgress(0);

      const file = e.target.files[0];

      const r = new FileReader();
      r.onload = () => {
        ctx.setCurrExt({
          ...ctx.currExt,
          size: r.result.byteLength,
          crx: Buffer.from(r.result)
        });

        document.getElementById("uploadExtension").value = "";
        resolve(null);
      };
      r.onprogress = async data => {
        ctx.setExtUploadProgress(parseInt((data.loaded / data.total) * 100));
      };
      r.readAsArrayBuffer(file);
    });
  };

  // Reset the progress.
  const ctx_ = useContext(DataContext);
  Router.events.on("routeChangeComplete", url => {
    ctx_.setExtUploadProgress(0);
  });

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
                    onClick={() => fakeUpload(ctx)}
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
                  className="my-1"
                  material
                  animated
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
