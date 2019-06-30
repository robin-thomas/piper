import Link from "next/link";

import { useState, forwardRef, useImperativeHandle } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBProgress } from "mdbreact";

const ExtensionUpload = forwardRef((props, ref) => {
  const [progress_, setProgress] = useState(0);
  const [disableUploadCrxButton_, disableUploadCrxButton] = useState(false);

  const fakeUpload = e => {
    e.preventDefault();
    document.getElementById("uploadExtension").click();
  };

  const uploadExtension = e => {
    props.disableParent(true);

    const r = new FileReader();
    r.onload = () => {
      props.updateExtensionSize(r.result.byteLength);
      props.updateExtensionCrx(Buffer.from(r.result));

      props.disableParent(false);
    };
    r.onprogress = async data => {
      setProgress(parseInt((data.loaded / data.total) * 100));
    };
    r.readAsArrayBuffer(e.target.files[0]);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      setProgress(0);
    },

    disable(status) {
      disableUploadCrxButton(status);
    }
  }));

  return (
    <div ref={ref}>
      <Row>
        <Col>
          {props.editable ? (
            <div>
              <input
                id="uploadExtension"
                name="myname"
                type="file"
                hidden
                onChange={uploadExtension}
              />
              <Button
                variant="dark"
                onClick={fakeUpload}
                disabled={disableUploadCrxButton_}
              >
                Upload .crx
              </Button>
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          {props.editable ? (
            <MDBProgress
              className="my-2"
              material
              value={progress_}
              color="dark"
              height="3px"
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
});

export default ExtensionUpload;
