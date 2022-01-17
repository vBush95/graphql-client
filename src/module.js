import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      user
      content
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription getMessages {
    messageCreated {
      id
      user
      content
    }
  }
`;

const NEW_USER = gql`
  subscription NewUser {
    newUser {
      roles
      permissions
      username
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation Mutation($username: String!, $content: String!) {
    createMessage(username: $username, content: $content) {
      content
    }
  }
`;

export { GET_MESSAGES, MESSAGE_SUBSCRIPTION, CREATE_MESSAGE, NEW_USER };
