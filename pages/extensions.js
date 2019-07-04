import Error from "next/error";

import { useContext } from "react";

import GlobalHead from "../components/utils/GlobalHead";
import Header from "../components/Header";
import Extension from "../components/Extension";
import { DataContext } from "../components/utils/DataProvider";

const Index = props => {
  if (props.err) {
    return <Error statusCode={404} />;
  }

  const ctx = useContext(DataContext);
  ctx.setExtension(props);

  if (props.hash === "new") {
    ctx.setNewExt(true);
    ctx.setEditable(true);
    ctx.setAuthorEditable(true);
  } else if (props.owner && props.owner === ctx.address) {
    ctx.setAuthorEditable(true);
    ctx.setExtension(props);
    ctx.setCurrExt(props);
  }

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Extension />
    </div>
  );
};

Index.getInitialProps = async function({ query: { hash } }) {
  // Create a new extension.
  let extension = {
    hash: hash,
    rating: null,
    reviews: null,
    downloads: null,
    size: null
  };

  if (hash !== "new") {
    try {
      const extensionWithOwner = await PiperContract.methods
        .getExtensionByHash(hash)
        .call();

      if (extensionWithOwner === null) {
        throw new Error(`Extension ${hash} cannot be found`);
      }

      extension = {
        ...extensionWithOwner.extension,
        owner: extensionWithOwner.owner
      };
    } catch (err) {
      extension = {
        err: true
      };
    }
  }

  return extension;
};

export default Index;
