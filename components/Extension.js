import Link from "next/link";

import { Container } from "react-bootstrap";

import moment from "moment";

import { useState, useRef } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

const Extension = props => {
  const extensionHeaderRef = useRef(null);
  const extensionDetailsRef = useRef(null);

  const [editable_, setEditable] = useState(false);
  const [updated_, setUpdated] = useState(props.updated);
  const [extensionSize_, setExtensionSize] = useState(props.extensionSize);

  const reset = () => {
    extensionHeaderRef.current.reset();
    extensionDetailsRef.current.reset();

    setEditable(false);
    setUpdated(props.updated);
    setExtensionSize(props.extensionSize);
  };

  const updateEditable = (editable, updated = false) => {
    if (updated) {
      setUpdated(
        moment()
          .local()
          .valueOf()
      );
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
        ref={extensionHeaderRef}
        parentReset={reset}
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
        overview={`Save to Google Keep in a single click!
       Found a webpage, image, or quote that you want to save for later? With the Google Keep Chrome Extension, easily save the things  you care about  to Keep and have them synced across all of the platforms that you use — including web, Android, iOS, and Wear. Take notes for additional detail and add labels to quickly categorize your note for later retrieval.

       Features:
        • Save URLs, text, and images
        • Take notes on saved content
        • Add labels to your notes
        • Automatically saves to Google Keep

       Try Google Keep on the web at http://keep.google.com, on your Android device at http://g.co/keep, and on your iOS device at https://itunes.apple.com/us/app/google-keep-your-thoughts/id1029207872.`}
        ref={extensionDetailsRef}
      />
    </Container>
  );
};

export default Extension;
