import Link from "next/link";

import { Container } from "react-bootstrap";

import moment from "moment";

import { useState, useRef } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

import Validator from "./utils/Validator";

import IPFS from "./utils/IPFS";

const Extension = props => {
  const extensionHeaderRef = useRef(null);
  const extensionDetailsRef = useRef(null);

  const [editable_, setEditable] = useState(props.editable ? true : false);
  const [updated_, setUpdated] = useState(props.updated);
  const [extensionSize_, setExtensionSize] = useState(props.extensionSize);
  const [extensionCrx_, setExtensionCrx] = useState(null);

  const reset = () => {
    extensionHeaderRef.current.reset();
    extensionDetailsRef.current.reset();

    setEditable(false);
    setUpdated(props.updated);
    setExtensionSize(props.extensionSize);
    setExtensionCrx(null);
  };

  const updateExtensionCrx = arrayBuffer => {
    setExtensionCrx(arrayBuffer);
  };

  const disable_ = status => {
    extensionDetailsRef.current.disable(status);
    extensionHeaderRef.current.disable(status);
  };

  const updateEditable = async (editable, updated = false) => {
    if (updated) {
      disable_(true);

      // Update the last updated time.
      const updatedTime = moment()
        .local()
        .valueOf();

      // Create the extension object.
      const extensionHeaderDetails = extensionHeaderRef.current.details();
      const extensionAdditionalDetails = extensionDetailsRef.current.details();
      const extension = {
        hash: props.hash,
        ...extensionHeaderDetails,
        ...extensionAdditionalDetails,
        updated: updatedTime,
        extensionSize: extensionSize_
      };

      // Validate this object.
      const { err, result } = Validator.validateExtension(extension);
      if (err) {
        alert(err);
        disable_(false);
        return;
      }

      // Upload the extension.crx to IPFS (only if updated & validation passed).
      if (extensionSize_ !== props.extensionSize) {
        try {
          extension.hash = await IPFS.uploadBuffer(extensionCrx_);
          console.log(`https://ipfs.infura.io/ipfs/${hash}`);
        } catch (err) {
          console.log(err);

          alert("Failed to update the extension!");

          disable_(false);
          return;
        }
      }

      console.log(extension);
      setUpdated(updatedTime);

      // TODO: upload it to the contract.

      disable_(false);
    }

    setEditable(editable);
  };

  return (
    <Container>
      <ExtensionHeader
        name={props.name}
        iconURL={props.iconURL}
        developer={props.developer}
        category={props.category}
        downloads={props.downloads}
        rating={props.rating}
        reviews={props.reviews}
        network={props.network}
        developerETH={props.developerETH}
        editable={editable_}
        authorEditable={props.authorEditable}
        onEditExtension={updateEditable}
        updateExtensionSize={setExtensionSize}
        updateExtensionCrx={updateExtensionCrx}
        ref={extensionHeaderRef}
        parentReset={reset}
        goBack={props.goBack}
      />
      <ExtensionImageSlider images={props.images} />
      <ExtensionDetails
        editable={editable_}
        version={props.version}
        updated={updated_}
        extensionSize={extensionSize_}
        overview={props.overview}
        ref={extensionDetailsRef}
      />
    </Container>
  );
};

export default Extension;
