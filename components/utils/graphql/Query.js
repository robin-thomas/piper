import { gql } from "apollo-boost";

const GET_EXTENSIONS = gql`
  query Extensions($skip: Int!) {
    extensions(orderBy: updated, orderDirection: desc, first: 10, skip: $skip) {
      hash
      developer
      developerETH
      iconURL
      rating
      reviews
      downloads
      category
      version
      crx
      overview
      updated
      size
      owner
    }
  }
`;

const GET_EXTENSION_VERSIONS = gql`
  query ExtensionVersions($hash: String!) {
    extensionVersions(where: { hash: $hash }) {
      hash
      version
      crx
    }
  }
`;

const GET_EXTENSION_REVIEWS = gql`
  query ExtensionReviews($hash: String!) {
    extensionReviews(where: { hash: $hash }) {
      hash
      version
      crx
    }
  }
`;

export { GET_EXTENSIONS };
export { GET_EXTENSION_VERSIONS };
export { GET_EXTENSION_REVIEWS };
