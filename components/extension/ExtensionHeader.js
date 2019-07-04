import Router from "next/router";

import { Row, Col, Button } from "react-bootstrap";

import ExtensionCategory from "./header/ExtensionCategory";
import ExtensionChrome from "./header/ExtensionChrome";
import ExtensionDeveloper from "./header/ExtensionDeveloper";
import ExtensionDeveloperETH from "./header/ExtensionDeveloperETH";
import ExtensionDownloads from "./header/ExtensionDownloads";
import ExtensionIcon from "./header/ExtensionIcon";
import ExtensionName from "./header/ExtensionName";
import ExtensionRating from "./header/ExtensionRating";
import ExtensionUpload from "./header/ExtensionUpload";

import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import Formatter from "../utils/Formatter";
import IPFS from "../utils/IPFS";
import PiperContract from "../utils/PiperContract";
import SpinnerButton from "../utils/SpinnerButton";
import TextInput from "../utils/TextInput";
import Validator from "../utils/Validator";

const ExtensionHeader = props => {
  const save = async ctx => {
    // Update the last updated time.
    const updatedTime = moment()
      .local()
      .valueOf();

    // Get the extension object.
    let extension = ctx.currExt;
    extension.updated = updatedTime;
    // TODO: might have to remove fields not required.

    // Validate this object.
    const { err, result } = Validator.validateExtension(extension);
    if (err) {
      alert(err);
      return;
    }

    // Upload the extension.crx to IPFS (only if updated & validation passed).
    if (extension.hash === null) {
      try {
        extension.hash = await IPFS.uploadBuffer(ctx.currExt.crx);
        extension.crx = `https://ipfs.infura.io/ipfs/${extension.hash}`;
        console.log(extension.crx);
      } catch (err) {
        console.log(err);

        alert("Failed to update the extension!");

        return;
      }
    }

    console.log(extension);
    setUpdated(updatedTime);

    // upload it to the contract.
    const { web3, portis, contract } = PiperContract.getWeb3(true);
    try {
      // extension.hash = "111";
      // extension.iconURL = "test icon URL";
      // extension.extensionCrxURL = "url";

      const fn = contract.methods.createNewExtension(extension.hash, extension);

      const response = await PiperContract.sendSignedTx(web3, portis, fn);
      console.log(response);
    } catch (err) {
      console.log(err);

      alert("Failed to upload the extension!");

      return;
    }

    ctx.setEditable(false);

    // Shallow redirect.
    const href = `/extensions?hash=${extension.hash}`;
    const as = `/extensions/${extension.hash}`;
    Router.push(href, as, { shallow: true });
  };

  const reset = ctx => {
    ctx.setEditable(false);
    ctx.setCurrExt(ctx.extension); // TODO: check whether needed.
  };

  const back = ctx => {
    Router.back();
    ctx.setCurrExt(ctx.extension);
  };

  return (
    <div>
      <EmptyRow />
      <Row className="extension-header">
        <Col md="auto" xs="4" className="text-right">
          <ExtensionIcon />
          <ExtensionChrome />
        </Col>
        <Col md="8" xs="10" className="extension-header-details">
          <ExtensionName />
          <ExtensionDeveloper />
          <Row className="extension-header-extra-details" noGutters="true">
            <Col md="auto" className="align-self-center">
              <Row>
                <ExtensionRating />
                <Col
                  md="auto"
                  className="extension-header-extra-details-border px-0"
                ></Col>
                <Col md="auto" className="align-self-center">
                  <ExtensionCategory />
                </Col>
                <Col
                  md="auto"
                  className="extension-header-extra-details-border px-0"
                ></Col>
                <ExtensionDownloads />
              </Row>
            </Col>
            <Col md="auto" className="ml-auto align-self-center">
              <ExtensionDeveloperETH />
            </Col>
          </Row>
          <EmptyRow />
        </Col>
        <Col md="2" className="ml-auto text-right">
          <Row>
            <Col>
              <DataConsumer>
                {ctx =>
                  ctx.editable === true ? (
                    <div>
                      <Row>
                        <Col>
                          <SpinnerButton
                            variant="success"
                            text="Save"
                            onClick={() => save(ctx)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            variant="danger"
                            onClick={
                              ctx.newExt === true
                                ? () => back(ctx)
                                : () => reset(ctx)
                            }
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : ctx.authorEditable === true ? (
                    <Button
                      variant="success"
                      onClick={() => ctx.setEditable(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button variant="dark">Add to Chrome</Button>
                  )
                }
              </DataConsumer>
            </Col>
          </Row>
          <ExtensionUpload />
        </Col>
      </Row>
      <style jsx global>{`
        .extension-header {
          border-bottom: 2px solid #f1f3f4;
        }

        .extension-header .extension-header-details > .row:first-child {
          height: 50px;
        }

        .extension-header .extension-header-details > .row:last-child {
          height: 25px;
        }

        .extension-header-extra-details-border {
          border-right: 1px solid #9aa0a6;
        }

        .extension-header-extra-details {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #5f6368;
        }
      `}</style>
    </div>
  );
};

export default ExtensionHeader;
