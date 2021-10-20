import React from "react";
import "./App.css";
import { MyObjectModelType, StoreContext } from "./models";
import { observer } from "mobx-react-lite";
function App() {
  const store = React.useContext(StoreContext);

  React.useEffect(
    () =>
      store.subscribeNewMessage(
        undefined,
        (s) => s.message.id,
        (item: MyObjectModelType) => {
          store.add(item);
          // show message
          console.log(item);
        }
      ),
    [store]
  );

  const [input, setInput] = React.useState("");

  return (
    <>
      <h1>Chat</h1>
      {Array.from(store.myObjects.values()).map((object) => {
        return (
          <div className="a-message">
            <div className="a-message__id">{object.id}</div>
            <div className="a-message__message">{object.message}</div>
          </div>
        );
      })}
      <form
        className="submit-area"
        onSubmit={(e) => {
          e.preventDefault();
          store.mutateAddNewObject({
            message: input,
          });
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="submit-area__input"
        />{" "}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default observer(App);
