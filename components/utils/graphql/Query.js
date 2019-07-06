import { gql } from "apollo-boost";

const GET_EXTENSIONS = gql`
  {
    extensions(orderBy: updated, orderDirection: desc, first: 10) {
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
  {
    extensionVersions(where: { hash: $hash }) {
      hash
      version
      crx
    }
  }
`;

const GET_EXTENSION_REVIEWS = gql`
  {
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
