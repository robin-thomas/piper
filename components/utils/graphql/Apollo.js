import ApolloClient from "apollo-boost";
import "cross-fetch/polyfill";

import config from "../../../config.json";
import {
  GET_EXTENSIONS,
  GET_EXTENSION_VERSIONS,
  GET_EXTENSION_REVIEWS,
  SEARCH_EXTENSIONS
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

  execQuery: async (query, args = {}) => {
    try {
      const result = await Apollo.getClient().query({
        query: query,
        variables: args
      });

      return result.data.extensions;
    } catch (err) {
      throw new Error(err.message);
    }
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

  searchExtensions: async (category, name, rating) => {
    return await Apollo.execQuery(SEARCH_EXTENSIONS, {
      category: category,
      name: name,
      rating: rating
    });
  }
};

export default Apollo;
