import ApolloClient from "apollo-boost";

import config from "../../../config.json";
import {
  GET_EXTENSIONS,
  GET_EXTENSION_VERSIONS,
  GET_EXTENSION_REVIEWS
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

  getExtensionList: async () => {
    return Apollo.getClient().query({
      query: GET_EXTENSIONS
    });
  },

  getExtensionVersions: async () => {
    return Apollo.getClient().query({
      query: GET_EXTENSION_VERSIONS
    });
  },

  getExtensionReviews: async () => {
    return Apollo.getClient().query({
      query: GET_EXTENSION_REVIEWS
    });
  }
};

export default Apollo;
