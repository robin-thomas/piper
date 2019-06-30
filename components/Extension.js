import Link from "next/link";

import { Container } from "react-bootstrap";

import moment from "moment";

import { useState, useRef } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

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

      // Upload the extension.crx to IPFS (only if updated).
      let hash = props.hash;
      if (extensionSize_ !== props.extensionSize) {
        try {
          hash = await IPFS.uploadBuffer(extensionCrx_);
          console.log(`https://ipfs.infura.io/ipfs/${hash}`);
        } catch (err) {
          console.log(err);

          alert("Failed to update the extension!");

          disable_(false);
          return;
        }
      }

      // Update the last updated time.
      const updatedTime = moment()
        .local()
        .valueOf();
      setUpdated(updatedTime);

      // Create the extension object.
      const extensionHeaderDetails = extensionHeaderRef.current.details();
      const extensionAdditionalDetails = extensionDetailsRef.current.details();
      const extension = {
        hash,
        ...extensionHeaderDetails,
        ...extensionAdditionalDetails,
        updated: updatedTime,
        extensionSize: extensionSize_
      };

      console.log(extension);

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
      <ExtensionImageSlider
        images={[
          "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
          "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
        ]}
      />
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
