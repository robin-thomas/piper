import Link from "next/link";

import { useState, forwardRef, useImperativeHandle } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBProgress } from "mdbreact";

const ExtensionUpload = forwardRef(({ editable, updateExtensionSize }, ref) => {
  const [progress_, setProgress] = useState(0);

  const fakeUpload = e => {
    e.preventDefault();
    document.getElementById("uploadExtension").click();
  };

  const uploadExtension = e => {
    const r = new FileReader();
    r.onload = () => {
      // TODO: to be done after extension is uploaded.

      // update parent with extensionSize.
      updateExtensionSize(r.result.byteLength);
    };
    r.onprogress = async data => {
      setProgress(parseInt((data.loaded / data.total) * 100));
    };
    r.readAsArrayBuffer(e.target.files[0]);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      setProgress(0);
    }
  }));

  return (
    <div ref={ref}>
      <Row>
        <Col>
          {editable ? (
            <div>
              <input
                id="uploadExtension"
                name="myname"
                type="file"
                hidden
                onChange={uploadExtension}
              />
              <Button variant="dark" onClick={fakeUpload}>
                Upload .crx file
              </Button>
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          {editable ? (
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
