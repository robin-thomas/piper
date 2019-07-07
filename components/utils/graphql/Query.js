import { gql } from "apollo-boost";

const IS_EXTENSION_UPDATED = gql`
  query Extension($hash: String!) {
    extension(hash: $hash) {
      hash
      updated
    }
  }
`;

const GET_EXTENSION_BY_HASH = gql`
  query Extension($hash: String!) {
    extension(hash: $hash) {
      hash
      developer
      iconURL
      category
      version
      crx
      overview
      updated
      size
      owner
      name
    }
  }
`;

const GET_EXTENSIONS = gql`
  query Extensions($skip: Int!) {
    extensions(orderBy: updated, orderDirection: desc, first: 10, skip: $skip) {
      hash
      developer
      iconURL
      category
      version
      crx
      overview
      updated
      size
      owner
      name
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
      rating
      reviews
    }
  }
`;

const SEARCH_EXTENSIONS = gql`
  query SearchExtensions($rating: Int!, $category: String!, $name: String!) {
    extensions(where: { name_starts_with: $name, category: $category }) {
      hash
    }

    extensionReviews(where: { rating_gte: $rating }) {
      hash
    }
  }
`;

const GET_EXTENSIONS_BY_HASH = gql`
  query Extension($hash: [String!]!) {
    extensions(where: { hash_in: $hash }) {
      hash
      developer
      iconURL
      category
      version
      crx
      overview
      updated
      size
      owner
      name
    }
  }
`;

export { IS_EXTENSION_UPDATED };
export { GET_EXTENSION_BY_HASH };
export { GET_EXTENSIONS };
export { GET_EXTENSION_VERSIONS };
export { GET_EXTENSION_REVIEWS };
export { SEARCH_EXTENSIONS };
export { GET_EXTENSIONS_BY_HASH };
