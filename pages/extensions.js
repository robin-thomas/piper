import GlobalHead from "../components/utils/GlobalHead";
import Header from "../components/Header";
import Extension from "../components/Extension";

import PiperContract from "../components/utils/PiperContract";

import Error from "next/error";

const Index = props => {
  if (props.err) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Extension {...props} />
      />
    </div>
  );
};

Index.getInitialProps = async function({ query: { hash } }) {
  // const key = `piper_extension_${hash}`;
  //
  // const value = window.localStorage.getItem(key);
  // if (value !== null && value.updated !== undefined && value.updated >= 11233) {
  //   return value;
  // }

  let extension = {};
  try {
    extension = await PiperContract.methods.getExtensionByHash(hash).call();

    if (extension === null) {
      throw new Error(`Extension ${hash} cannot be found`);
    }
  } catch (err) {
    extension = {
      err: true
    };
  }

  // const extension = {
  //   name: "Honey",
  //   iconURL:
  //     "https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365",
  //   developer: "https://www.joinhoney.com/",
  //   developerETH: "0x63B42a7662538A1dA732488c252433313396eade",
  //   rating: 2.5,
  //   reviews: "6788",
  //   category: "Shopping",
  //   downloads: "699",
  //   overview: `Save to Google Keep in a single click!
  //  Found a webpage, image, or quote that you want to save for later? With the Google Keep Chrome Extension, easily save the things  you care about  to Keep and have them synced across all of the platforms that you use — including web, Android, iOS, and Wear. Take notes for additional detail and add labels to quickly categorize your note for later retrieval.
  //
  //  Features:
  //   • Save URLs, text, and images
  //   • Take notes on saved content
  //   • Add labels to your notes
  //   • Automatically saves to Google Keep
  //
  //  Try Google Keep on the web at http://keep.google.com, on your Android device at http://g.co/keep, and on your iOS device at https://itunes.apple.com/us/app/google-keep-your-thoughts/id1029207872.`,
  //   version: "3.1.19252.1308",
  //   extensionSize: "11110555"
  // };

  return extension;
};

export default Index;