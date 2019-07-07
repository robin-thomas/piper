import Error from "next/error";

import { useContext, useEffect } from "react";

import Extension from "../components/Extension";
import Header from "../components/Header";

import Cache from "../components/utils/Cache";
import { DataContext } from "../components/utils/DataProvider";
import GlobalHead from "../components/utils/GlobalHead";
import Apollo from "../components/utils/graphql/Apollo";

const Index = props => {
  if (props.err) {
    return <Error statusCode={404} />;
  }

  const ctx = useContext(DataContext);

  const selectPage = (hash, ctx, extension, owner) => {
    if (hash === "new") {
      ctx.setNewExt(true);
      ctx.setEditable(true);
      ctx.setAuthorEditable(true);
    } else if (owner && owner === ctx.address) {
      ctx.setNewExt(false);
      ctx.setAuthorEditable(true);
      ctx.setEditable(false);

      ctx.setExtension({ ...extension, owner: owner });
      ctx.setCurrExt({ ...extension, owner: owner });
    } else {
      ctx.setNewExt(false);
      ctx.setAuthorEditable(false);
      ctx.setEditable(false);

      ctx.setCurrExt({ ...extension, owner: owner });
    }
  };

  useEffect(() => selectPage(props.hash, ctx, props.extension, props.owner), [
    props.hash
  ]);

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Extension />
    </div>
  );
};

Index.getInitialProps = async ({ query: { hash } }) => {
  // Create a new extension.
  let extension = {
    hash: hash
  };

  if (hash !== "new") {
    try {
      try {
        const isUpdated = await Apollo.isExtensionUpdated(hash);
        if (!isUpdated) {
          // Load from the cache.
          extension = Cache.get(hash);
        } else {
          const _ext = await Apollo.getExtensionByHash(hash);

          extension = { extension: { ..._ext }, owner: _ext.owner };
        }
      } catch (err) {
        extension = await PiperContract.methods.getExtensionByHash(hash).call();

        if (extension === null) {
          throw new Error(`Extension ${hash} cannot be found`);
        }

        // TODO: put it in the cache.
      }
    } catch (err) {
      extension = {
        err: true
      };
    }
  }

  console.log(extension);

  return extension;
};

export default Index;
