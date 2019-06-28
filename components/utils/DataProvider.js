import React, { Component } from "react";

import { call } from "../../api";

import * as dummyData from "./dummyData.json";

const DataContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      iconURL: this.props.iconURL,
      developer: this.props.developer,
      developerETH: this.props.developerETH,
      rating: this.props.rating,
      reviews: this.props.reviews,
      category: this.props.category,
      downloads: this.props.downloads,
      overview: this.props.overview,
      version: this.props.version,
      updated: this.props.updated,
      size: this.props.size,
      editable: false,
      authorEditable: true
    };
  }

  static async getInitialProps(ctx) {
    // Get the extension details.

    return {
      name: "Honey",
      iconURL:
        "https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365",
      developer: "https://www.joinhoney.com/",
      developerETH: "0x63B42a7662538A1dA732488c252433313396eade",
      rating: 2.5,
      reviews: "6788",
      category: "Shopping",
      downloads: "699",
      overview: `Save to Google Keep in a single click!
     Found a webpage, image, or quote that you want to save for later? With the Google Keep Chrome Extension, easily save the things  you care about  to Keep and have them synced across all of the platforms that you use — including web, Android, iOS, and Wear. Take notes for additional detail and add labels to quickly categorize your note for later retrieval.

     Features:
      • Save URLs, text, and images
      • Take notes on saved content
      • Add labels to your notes
      • Automatically saves to Google Keep

     Try Google Keep on the web at http://keep.google.com, on your Android device at http://g.co/keep, and on your iOS device at https://itunes.apple.com/us/app/google-keep-your-thoughts/id1029207872.`,
      version: "3.1.19252.1308",
      updated: this.props.updated,
      size: "11110555"
    };
  }

  getExtensionDetails = extensionId => {
    // Load the extension details.
    // Update the state.
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export default DataProvider;
export { DataConsumer };
