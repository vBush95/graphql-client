import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
  from,
} from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "./context/accessToken";
import AppRefresh from "./AppRefresh";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { onError } from "@apollo/client/link/error";
import { SubscriptionClient } from "subscriptions-transport-ws";

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000 ? false : true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: async () => {
    const result = await fetch(
      "https://server-meine-tolle-seite-1.herokuapp.com/refresh_token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    return result;
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleResponse: (operation, accessTokenField) => (response) => {
    // here you can parse response, handle errors, prepare returned token to
    // further operations
    // returned object should be like this:
    // {
    //    access_token: 'token string here'
    // }
  },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);

    // your custom action here
    //user.logout();
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  console.log(networkError);
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
        //"client-name": "WidgetX Ecom [web]",
        //"client-version": "1.0.0",
      },
    }));
  }

  return forward(operation);
});

const httpLink = new HttpLink({
  //uri: "http://localhost:4000/graphql",
  uri: "https://server-meine-tolle-seite-1.herokuapp.com/graphql",
  credentials: "include",
  /*
  request: (operation) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          auhtorization: `Bearer ${accessToken}`,
        },
      });
    }
  },
  */
});

export const wsClient = new SubscriptionClient(
  "wss://server-meine-tolle-seite-1.herokuapp.com/graphql",
  //"ws://localhost:4000/graphql"
  {
    //reconnect: true,
    lazy: true,
    connectionParams: () => {
      const token = getAccessToken();
      const decodedToken = jwtDecode(token);
      return { decodedToken };
    },
  }
);

wsClient.onConnected(() => console.log("websocket connected!!"));
wsClient.onDisconnected(() => console.log("websocket disconnected!!"));
wsClient.onReconnected(() => console.log("websocket reconnected!!"));
wsClient.close(() => console.log("websocket connection closed"));

const wsLink = new WebSocketLink(wsClient);

/*
const wsLink = new WebSocketLink({
  uri: process.env.WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      //TODO user not dfined
      //authToken: user.authToken,
    },
  },
});
*/

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
  //authLink
);

const additiveLink = from([refreshTokenLink, errorLink, authLink, splitLink]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me: {
          read: (_, { readField }) => {},
        },
      },
    },
  },
  /*
  typePolicies: {
    Query: {
      fields: {
        message: {
          read: (existing, { toReference, args }) => {
            const messageRef = toReference({
              __typename: "Message",
              code: args.id,
            });
            return existing ?? messageRef;
          },
        },
      },
    },
    Message: {
      keyFields: ["id"],
      fields: {
        contentAndUser: {
          read: (existing, {}) => {
            return null;
          },
        },
      },
    },
  },
  */
});

const client = new ApolloClient({
  link: additiveLink,
  //link: concat(authLink, splitLink),
  cache,
  //credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppRefresh />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
