import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query getMessages {
    getMessages {
      _id
      username
      content
      createdAt
    }
  }
`;
const GET_ME = gql`
  query Me {
    me {
      permissions
      roles
      email
      username
      settings {
        usernameColor
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription getMessages {
    messageCreated {
      _id
      username
      content
      createdAt
    }
  }
`;

const USERNAME_COLOR_SUBSCRIPTION = gql`
  subscription getUsernameColor {
    usernameColorChanged {
      username
      settings {
        usernameColor
      }
    }
  }
`;

const USERS_ONLINE_SUBSCRIPTION = gql`
  subscription Subscription {
    usersOnline {
      settings {
        usernameColor
      }
      username
    }
  }
`;

const UPDATE_LASTSEEN_MUTATION = gql`
  mutation UpdateLastSeen($timestamp: String!) {
    updateLastSeen(timestamp: $timestamp)
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
      _id
      username
      content
      createdAt
    }
  }
`;

const ADD_USER_TO_ONLINE = gql`
  mutation Mutation {
    addToUsersInChat {
      settings {
        usernameColor
      }
      username
    }
  }
`;

const REMOVE_USER_FROM_ONLINE = gql`
  mutation RemoveFromUsersInChat {
    removeFromUsersInChat {
      settings {
        usernameColor
      }
      username
    }
  }
`;

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        username
        roles
        permissions
        email
        _id
      }
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const UPDATE_USERNAME_COLOR_MUTATION = gql`
  mutation UpdateUserSettingsNameColor($color: String!) {
    updateUserSettingsNameColor(color: $color) {
      settings {
        usernameColor
      }
      username
    }
  }
`;

export {
  GET_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  CREATE_MESSAGE,
  NEW_USER,
  LOGIN,
  GET_ME,
  LOGOUT,
  USERS_ONLINE_SUBSCRIPTION,
  ADD_USER_TO_ONLINE,
  REMOVE_USER_FROM_ONLINE,
  UPDATE_LASTSEEN_MUTATION,
  UPDATE_USERNAME_COLOR_MUTATION,
  USERNAME_COLOR_SUBSCRIPTION,
};
