import ApolloClient from "apollo-boost";
import "cross-fetch/polyfill";

import config from "../../../config.json";
import {
  GET_EXTENSIONS,
  GET_EXTENSION_VERSIONS,
  GET_EXTENSION_REVIEWS,
  SEARCH_EXTENSIONS,
  GET_EXTENSIONS_BY_HASH
} from "./Query";

const Apollo = {
  client: null,

  getClient: () => {
    if (Apollo.client === null) {
      Apollo.client = new ApolloClient({
        uri: config.graph.api
      });
    }

    return Apollo.client;
  },

  execQuery: async (query, args = {}, key = "extensions") => {
    try {
      const result = await Apollo.getClient().query({
        query: query,
        variables: args
      });

      return result.data[key];
    } catch (err) {
      throw new Error(err.message);
    }
  },

  isExtensionUpdated: async (hash, lastUpdated) => {
    try {
      const extension = await Apollo.execQuery(
        IS_EXTENSION_UPDATED,
        {
          hash: hash
        },
        "extension"
      );

      if (extension.updated > lastUpdated) {
        return true;
      }
    } catch (err) {}

    return false;
  },

  getExtensionByHash: async hash => {
    return await Apollo.execQuery(
      GET_EXTENSION_BY_HASH,
      {
        hash: hash
      },
      "extension"
    );
  },

  getExtensionList: async (skip = 0) => {
    return await Apollo.execQuery(GET_EXTENSIONS, {
      skip: skip
    });
  },

  getExtensionVersions: async hash => {
    return await Apollo.execQuery(GET_EXTENSION_VERSIONS, {
      hash: hash
    });
  },

  getExtensionReviews: async hash => {
    return await Apollo.execQuery(GET_EXTENSION_REVIEWS, {
      hash: hash
    });
  },

  searchExtensions: async ({ category, text, rating }, skip = 0) => {
    try {
      let result = await Apollo.getClient().query({
        query: SEARCH_EXTENSIONS,
        variables: {
          category: category,
          name: text,
          rating: rating
        }
      });

      let hashes = [];
      const ext = result.data.extensions
        .filter(e => e.hash !== undefined)
        .map(e => e.hash);
      if (rating > 0) {
        const extR = result.data.extensionReviews
          .filter(e => e.hash !== undefined)
          .map(e => e.hash);
        hashes = ext.filter(val => extR.includes(val));
      } else {
        hashes = ext;
      }

      if (hashes.length > 0) {
        return await Apollo.execQuery(GET_EXTENSIONS_BY_HASH, {
          hash: hashes
        });
      }

      return [];
    } catch (err) {
      throw new Error(err.message);
    }

    return await Apollo.execQuery(SEARCH_EXTENSIONS, {
      skip: skip
    });
  }
};

export default Apollo;
