import Link from "next/link";
import Router from "next/router";

import { Container } from "react-bootstrap";

import moment from "moment";

import { useState, useRef } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

import Validator from "./utils/Validator";

import IPFS from "./utils/IPFS";

import { PiperWeb3 } from "./utils/PiperContract";

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
      let extension = {
        hash: props.hash,
        rating: props.rating,
        downloads: props.downloads,
        reviews: props.reviews,
        ...extensionHeaderDetails,
        ...extensionAdditionalDetails,
        updated: updatedTime,
        extensionSize: extensionSize_,
        isExtension: true
      };

      // Validate this object.
      // const { err, result } = Validator.validateExtension(extension);
      // if (err) {
      //   alert(err);
      //   disable_(false);
      //   return;
      // }

      // Upload the extension.crx to IPFS (only if updated & validation passed).
      // if (extensionSize_ !== props.extensionSize) {
      //   try {
      //     extension.hash = await IPFS.uploadBuffer(extensionCrx_);
      //     console.log(`https://ipfs.infura.io/ipfs/${hash}`);
      //   } catch (err) {
      //     console.log(err);
      //
      //     alert("Failed to update the extension!");
      //
      //     disable_(false);
      //     return;
      //   }
      // }
      //
      console.log(extension);
      // setUpdated(updatedTime);

      // upload it to the contract.
      const { web3, portis, contract } = PiperWeb3.getWeb3();
      try {
        extension.hash = "111";
        extension.iconURL = "test icon URL";
        extension.previews = ["image1", "image2"];
        extension.extensionCrxURL = "url";

        const fn = contract.methods.createNewExtension(
          extension.hash,
          extension
        );

        const response = await PiperWeb3.sendSignedTx(web3, portis, fn);
        console.log(response);
      } catch (err) {
        console.log(err);

        alert("Failed to upload the extension!");

        disable_(false);
        return;
      }

      // Shallow redirect.
      const href = `/extensions?hash=${extension.hash}`;
      const as = `/extensions/${extension.hash}`;
      Router.push(href, as, { shallow: true });

      disable_(false);
    }

    setEditable(editable);
  };

  return (
    <Container>
      <ExtensionHeader
        name={props.name}
        iconURL={props.iconURL}
        developer={props.developer ? props.developer : ""}
        category={props.category}
        downloads={props.downloads ? props.downloads : "0"}
        rating={props.rating ? props.rating : 0}
        reviews={props.reviews ? props.reviews : "0"}
        network={props.network}
        developerETH={props.developerETH}
        editable={editable_}
        authorEditable={props.authorEditable}
        onEditExtension={updateEditable}
        updateExtensionSize={setExtensionSize}
        updateExtensionCrx={updateExtensionCrx}
        ref={extensionHeaderRef}
        parentReset={reset}
        goBack={Router.back}
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
