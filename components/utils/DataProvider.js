import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("Sign In");
  const [address, setAddress] = useState(null);

  // static async getInitialProps(ctx) {
  //   // use web3 to get top extensions.
  // }
  //
  // static async getExtensionDetails(hash) {
  //   // Use web3 to get extension details.
  //   // const extension = await ...
  //   const extension = {
  //     name: "Honey",
  //     iconURL:
  //       "https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365",
  //     developer: "https://www.joinhoney.com/",
  //     developerETH: "0x63B42a7662538A1dA732488c252433313396eade",
  //     rating: 2.5,
  //     reviews: "6788",
  //     category: "Shopping",
  //     downloads: "699",
  //     overview: `Save to Google Keep in a single click!
  //    Found a webpage, image, or quote that you want to save for later? With the Google Keep Chrome Extension, easily save the things  you care about  to Keep and have them synced across all of the platforms that you use — including web, Android, iOS, and Wear. Take notes for additional detail and add labels to quickly categorize your note for later retrieval.
  //
  //    Features:
  //     • Save URLs, text, and images
  //     • Take notes on saved content
  //     • Add labels to your notes
  //     • Automatically saves to Google Keep
  //
  //    Try Google Keep on the web at http://keep.google.com, on your Android device at http://g.co/keep, and on your iOS device at https://itunes.apple.com/us/app/google-keep-your-thoughts/id1029207872.`,
  //     version: "3.1.19252.1308",
  //     updated: 111112238,
  //     size: "11110555"
  //   };
  //
  //   return extension;
  // }

  return (
    <DataContext.Provider
      value={{ loggedIn, setLoggedIn, email, setEmail, address, setAddress }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export default DataProvider;
export { DataConsumer };
