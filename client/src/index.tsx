import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHttpClient } from "mst-gql";
import { RootStore, StoreContext } from "./models";
import { SubscriptionClient } from "subscriptions-transport-ws";

const gqlHttpClient = createHttpClient(`http://192.168.235.88:4000/graphql`, {
  mode: "cors",
});

const gqlWsClient = new SubscriptionClient(`ws://192.168.235.88:4000/graphql`, {
  reconnect: true,
});

gqlWsClient.onDisconnected(() => console.log("I am disconnected"));
gqlWsClient.onConnected(() => console.log("I am connected"));
gqlWsClient.onReconnected(() => console.log("I am reconnected"));

const store = RootStore.create(undefined, { gqlHttpClient, gqlWsClient });

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
