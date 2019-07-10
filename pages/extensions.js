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

  const selectPage = (extension, ctx, owner) => {
    const hash = extension.hash;

    if (hash === "new") {
      ctx.setNewExt(true);
      ctx.setEditable(true);
      ctx.setAuthorEditable(true);

      ctx.setExtension({});
      ctx.setCurrExt({});
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

  useEffect(() => selectPage(props.extension, ctx, props.owner), [
    ctx.address,
    props.extension.hash,
    props.extension.updated
  ]);

  return (
    <div>
      <GlobalHead title="Piper | Decentralized Chromium web store" />
      <Header />
      <Extension hash={props.extension.hash} reviews={props.reviews} />
    </div>
  );
};

Index.getInitialProps = async ({ query: { hash } }) => {
  // Create a new extension.
  let props = {
    extension: {
      hash: hash
    }
  };

  if (hash !== "new") {
    try {
      try {
        const isUpdated = await Apollo.isExtensionUpdated(hash);
        if (!isUpdated) {
          // Load from the cache.
          props = Cache.get(hash);
        } else {
          const _ext = await Apollo.getExtensionByHash(hash);

          props = { extension: { ..._ext }, owner: _ext.owner };
        }
      } catch (err) {
        const _ext = await Apollo.getExtensionByHash(hash);

        props = { extension: { ..._ext }, owner: _ext.owner };

        if (props === null) {
          throw new Error(`Extension ${hash} cannot be found`);
        }

        // Put it into cache.
        Cache.put(hash, props.extension, props.owner);
      }

      // Get the reviews of this extension.
      try {
        const _reviews = await Apollo.getExtensionReviews(hash);
        props.reviews = _reviews;
      } catch (err) {}
    } catch (err) {
      props = {
        err: true
      };
    }
  }

  console.log(props);

  return props;
};

export default Index;
