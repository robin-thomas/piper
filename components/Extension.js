import Link from "next/link";

import { Container } from "react-bootstrap";

import { Component } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

class Extension extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false
    };
  }

  updateEditable = editable => {
    this.setState({
      editable: editable
    });
  };

  render() {
    return (
      <Container>
        <ExtensionHeader
          name="Honey"
          iconURI="https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365"
          author="https://www.joinhoney.com/"
          category="Shopping"
          downloads="699"
          rating={2.5}
          reviews="6788"
          network="ropsten"
          developerETH="0x63B42a7662538A1dA732488c252433313396eade"
          editable={this.state.editable}
          authorEditable={this.props.authorEditable}
          onEditExtension={this.updateEditable}
        />
        <ExtensionImageSlider
          images={[
            "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
            "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
          ]}
        />
        <ExtensionDetails
          editable={this.state.editable}
          version="3.1.19252.1308"
          size="11110555"
          overview={`Save to Google Keep in a single click!
         Found a webpage, image, or quote that you want to save for later? With the Google Keep Chrome Extension, easily save the things  you care about  to Keep and have them synced across all of the platforms that you use — including web, Android, iOS, and Wear. Take notes for additional detail and add labels to quickly categorize your note for later retrieval.

         Features:
          • Save URLs, text, and images
          • Take notes on saved content
          • Add labels to your notes
          • Automatically saves to Google Keep

         Try Google Keep on the web at http://keep.google.com, on your Android device at http://g.co/keep, and on your iOS device at https://itunes.apple.com/us/app/google-keep-your-thoughts/id1029207872.`}
        />
      </Container>
    );
  }
}

export default Extension;
