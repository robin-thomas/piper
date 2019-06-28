import Link from "next/link";

import { Component } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBProgress } from "mdbreact";

class ExtensionUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  fakeUpload = e => {
    e.preventDefault();
    document.getElementById("uploadExtension").click();
  };

  uploadExtension = e => {
    const r = new FileReader();
    r.onload = e => {};
    r.onprogress = async data => {
      this.setState({
        progress: parseInt((data.loaded / data.total) * 100)
      });
    };
    r.readAsArrayBuffer(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            {this.props.editable ? (
              <div>
                <input
                  id="uploadExtension"
                  name="myname"
                  type="file"
                  hidden
                  onChange={this.uploadExtension}
                />
                <Button variant="dark" onClick={this.fakeUpload}>
                  Upload .crx file
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.editable ? (
              <MDBProgress
                className="my-2"
                material
                value={this.state.progress}
                color="dark"
                height="3px"
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExtensionUpload;
