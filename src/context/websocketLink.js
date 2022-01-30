import { SubscriptionClient } from "subscriptions-transport-ws";
import { getAccessToken } from "./accessToken";
const wsClient = new SubscriptionClient("ws://localhost:4000/graphql", {
  reconnect: true,
  connectionParams: {
    authToken: getAccessToken(),
  },
});

export default wsClient;
