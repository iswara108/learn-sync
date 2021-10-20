import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHttpClient } from "mst-gql";
import { RootStore, StoreContext } from "./models";
import { SubscriptionClient } from "subscriptions-transport-ws";

const gqlHttpClient = createHttpClient(
  `http${process.env.REACT_APP_SERVER}/graphql`,
  {
    mode: "cors",
  }
);

const gqlWsClient = new SubscriptionClient(
  `ws${process.env.REACT_APP_SERVER}/graphql`,
  {
    reconnect: true,
  }
);

gqlWsClient.onDisconnected(() =>
  console.log(new Date().toISOString(), "I am disconnected")
);
gqlWsClient.onConnected(() =>
  console.log(new Date().toISOString(), "I am connected")
);
gqlWsClient.onReconnected(() =>
  console.log(new Date().toISOString(), "I am reconnected")
);

const store = RootStore.create(undefined, { gqlHttpClient, gqlWsClient });

store.queryGetNames();

(window as any).store = store;
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
