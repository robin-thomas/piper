import { Row, Col, Button } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

const ExtensionIcon = props => {
  const fakeUploadIcon = e => {
    e.preventDefault();
    document.getElementById("extension-header-icon-file").click();
  };

  const uploadIcon = (e, ctx) => {
    const file = e.target.files[0];
    if (file.size > 1048576 /* 1MB */) {
      alert("Icon size should be less than 1MB!");
      return;
    }

    const r = new FileReader();
    r.onload = result => {
      ctx.setCurrExt({ ...ctx.currExt, iconURL: result.target.result });
    };
    r.readAsDataURL(file);
  };

  const getExtensionIcon = iconURL => {
    if (/^data:.+\/(.+);base64,(.*)$/.test(iconURL)) {
      return iconURL;
    }

    try {
      new URL(iconURL);
      return iconURL;
    } catch (err) {
      return `https://ipfs.infura.io/ipfs/${iconURL}`;
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <DataConsumer>
            {ctx => (
              <img
                className="extension-header-icon"
                src={
                  ctx.currExt && ctx.currExt.iconURL
                    ? getExtensionIcon(ctx.currExt.iconURL)
                    : require("../../../static/images/camera.svg")
                }
                title="Extension Icon"
              />
            )}
          </DataConsumer>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataConsumer>
            {ctx => (
              <div>
                <input
                  type="file"
                  hidden
                  id="extension-header-icon-file"
                  onChange={e => uploadIcon(e, ctx)}
                  accept="image/*"
                />
                {ctx.editable === true ? (
                  <Button
                    variant="dark"
                    onClick={fakeUploadIcon}
                    disabled={ctx.textDisabled}
                  >
                    Upload Icon
                  </Button>
                ) : null}
              </div>
            )}
          </DataConsumer>
        </Col>
      </Row>
      <style jsx global>{`
        .extension-header-icon {
          width: 60px;
          height: 60px;
        }
      `}</style>
    </div>
  );
};

export default ExtensionIcon;
