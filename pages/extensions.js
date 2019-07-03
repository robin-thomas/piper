import Error from "next/error";

import { useEffect, useContext } from "react";

import GlobalHead from "../components/utils/GlobalHead";
import Header from "../components/Header";
import Extension from "../components/Extension";
import { DataContext } from "../components/utils/DataProvider";
import PiperContract from "../components/utils/PiperContract";

const Index = props => {
  if (props.err) {
    return <Error statusCode={404} />;
  }

  const context = useContext(DataContext);
  context.setExtension(props);

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Extension {...context.extension} />
      />
    </div>
  );
};

Index.getInitialProps = async function({ query: { hash } }) {
  // Create a new extension.
  let extension = {
    rating: 0,
    reviews: "0",
    downloads: "0",
    extensionSize: "0",
    authorEditable: true,
    editable: true
  };

  if (hash !== "new") {
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
  }

  return extension;
};

export default Index;
