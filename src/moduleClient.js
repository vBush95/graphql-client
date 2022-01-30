import { gql } from "@apollo/client";

const LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export { LOGGED_IN_QUERY };
