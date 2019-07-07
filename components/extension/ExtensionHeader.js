import Router from "next/router";

import _ from "lodash";
import moment from "moment";
import fetch from "node-fetch";
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

import Cache from "../utils/Cache";
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
      .unix();

    // Get the extension object.
    let extension = { ...ctx.currExt };
    extension.updated = updatedTime;
    extension.category =
      extension.category === undefined ? "All" : extension.category;

    // Validate this object.
    const { error } = Validator.validateExtension(extension, ctx.extension);
    if (error) {
      console.log(error);
      throw new Error(error);
    }

    // Upload the extension.crx to IPFS (only if updated & validation passed).
    if (_.isEmpty(extension.hash) || ctx.currExt.size !== ctx.extension.size) {
      try {
        const hash_ = await IPFS.uploadBuffer(ctx.currExt.crx);
        // extension.crx = `https://ipfs.infura.io/ipfs/${hash_}`;
        extension.crx = hash_;

        if (_.isEmpty(extension.hash)) {
          extension.hash = hash_;
        }
      } catch (err) {
        console.log(err);

        throw new Error("Failed to upload the extension!");
      }
    }

    // iconURL is updated.
    if (/^data:.+\/(.+);base64,(.*)$/.test(extension.iconURL)) {
      try {
        const blob = await (await fetch(extension.iconURL)).blob();
        const buffer = await new Response(blob).arrayBuffer();
        extension.iconURL = await IPFS.uploadBuffer(new Buffer(buffer));
      } catch (err) {
        console.log(err);

        throw new Error("Failed to upload the extension icon!");
      }
    }

    console.log(extension);

    // upload it to the contract.
    const { web3, portis, contract } = PiperContract.getWeb3(true);
    try {
      const fn = contract.methods.createNewExtension(extension);
      const txHash = await PiperContract.sendSignedTx(web3, portis, fn);
      console.log(txHash);
      const receipt = await PiperContract.getTransactionReceipt(web3, txHash);
      console.log(receipt);
    } catch (err) {
      console.log(err);

      throw new Error("Failed to update the extension!");
    }

    ctx.setCurrExt({ ...ctx.currExt, updated: updatedTime });
    Cache.set(extension.hash, extension, ctx.address);

    return {
      redirect: {
        href: `/extensions?hash=${extension.hash}`,
        as: `/extensions/${extension.hash}`
      }
    };
  };

  const reset = ctx => {
    ctx.setEditable(false);
    ctx.setCurrExt({ ...ctx.extension }); // TODO: check whether needed.
  };

  const back = ctx => {
    Router.back();
    ctx.setCurrExt({ ...ctx.extension });
  };

  return (
    <div>
      <EmptyRow />
      <Row className="extension-header">
        <Col md="auto" xs="4" className="text-right">
          <ExtensionIcon />
          <DataConsumer>
            {ctx => (ctx.editable === true ? <ExtensionChrome /> : null)}
          </DataConsumer>
        </Col>
        <Col md="8" xs="10" className="extension-header-details">
          <ExtensionName />
          <ExtensionDeveloper />
          <Row className="extension-header-extra-details" noGutters="true">
            <Col md="auto" className="align-self-center">
              <Row>
                <DataConsumer>
                  {ctx => (
                    <ExtensionRating
                      rating={
                        ctx.currExt && ctx.currExt.rating
                          ? ctx.currExt.rating
                          : 0
                      }
                    />
                  )}
                </DataConsumer>
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
        <Col md="auto" className="ml-auto text-right">
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
                            disabled={ctx.textDisabled}
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
                      disabled={ctx.textDisabled}
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
