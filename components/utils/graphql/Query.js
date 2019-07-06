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

const SEARCH_EXTENSIONS = gql`
  query SearchExtensions(
    $skip: Int!
    $rating: Int!
    $category: String!
    $name: String
  ) {
    extensions(
      orderBy: updated
      orderDirection: desc
      first: 10
      skip: $skip
      where: {
        rating_gte: $rating
        category: $category
        name_starts_with: $name
      }
    ) {
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

export { GET_EXTENSIONS };
export { GET_EXTENSION_VERSIONS };
export { GET_EXTENSION_REVIEWS };
export { SEARCH_EXTENSIONS };
