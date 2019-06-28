import Link from "next/link";

import { Container } from "react-bootstrap";

import moment from "moment";

import { Component } from "react";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

class Extension extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      extensionSize: this.props.extensionSize
    };
  }

  updateEditable = editable => {
    if (editable === false) {
      this.setState({
        editable: editable,
        updated: moment()
          .local()
          .valueOf()
      });
    } else {
      this.setState({
        editable: editable
      });
    }
  };

  updateExtensionSize = extensionSize => {
    this.setState({
      extensionSize: extensionSize
    });
  };

  cancelUpdate = () => {
    this.setState({
      extensionSize: this.props.extensionSize,
      editable: false
    });
  };

  render() {
    return (
      <Container>
        <ExtensionHeader
          name={this.props.name}
          iconURL={this.props.iconURL}
          developer={this.props.developer}
          category={this.props.category}
          downloads={this.props.downloads}
          rating={this.props.rating}
          reviews={this.props.reviews}
          network={this.props.network}
          developerETH={this.props.developerETH}
          editable={this.state.editable}
          authorEditable={this.props.authorEditable}
          onEditExtension={this.updateEditable}
          updateExtensionSize={this.updateExtensionSize}
          onCancelUpdate={this.cancelUpdate}
        />
        <ExtensionImageSlider
          images={[
            "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
            "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
          ]}
        />
        <ExtensionDetails
          editable={this.state.editable}
          onSaveExtension={this.saveExtension}
          version="3.1.19252.1308"
          updated={this.state.updated}
          size={this.state.extensionSize}
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
