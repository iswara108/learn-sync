import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  InsideObjectModelType,
  MyObjectModelType,
  StoreContext,
} from "./models";

function App() {
  const store = React.useContext(StoreContext);

  React.useEffect(
    () =>
      store.subscribeNewName(
        undefined,
        (s) => s.name.insideObject((i) => i.dateOfBirth),
        (item: MyObjectModelType) =>
          alert(
            (item.insideObject as InsideObjectModelType | undefined)
              ?.dateOfBirth
          )
      ),
    [store]
  );

  return (
    <div className="App">
      <button onClick={() => store.mutateAddNewObject({ name: "Om Om" })}>
        Mutate Name
      </button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
