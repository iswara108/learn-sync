import React from "react";
import "./App.css";
import { StoreContext, TypingResponseModelType } from "./models";
import { observer } from "mobx-react-lite";
import { useIsTyping } from "use-is-typing";

function App() {
  const store = React.useContext(StoreContext);

  const [input, setInput] = React.useState("");
  const [isTyping, register] = useIsTyping({ timeout: 3000 });
  const [someoneTyping, setSomeoneTyping] = React.useState<
    {
      author: string;
      typing: boolean;
    }[]
  >([]);
  React.useEffect(() => {
    store.mutateSetIsTyping({ typing: isTyping });
    console.log("sent istyping mutation", isTyping);
  }, [isTyping, store]);

  React.useEffect(() => {
    store.subscribeIsTyping(
      undefined,
      (s) => s.author.typing,
      (typingPayload: TypingResponseModelType) => {
        if (typingPayload.typing) {
          setSomeoneTyping((someoneTyping) =>
            someoneTyping.concat({
              author: typingPayload.author || "unidentified",
              typing: typingPayload.typing || false,
            })
          );
        } else {
          setSomeoneTyping((someoneTyping) =>
            someoneTyping.filter((s) => s.author !== typingPayload.author)
          );
        }
      }
    );
  }, [store, setSomeoneTyping]);
  return (
    <>
      <h1>Chat</h1>
      <div className="messages">
        {Array.from(store.myObjects.values()).map((object) => {
          return (
            <div className="a-message">
              <div className="a-message__id">{object.id}</div>
              <div className="a-message__author">{object.author}</div>
              <div className="a-message__message">{object.message}</div>
            </div>
          );
        })}
      </div>
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
          ref={register}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="typing-data">
        {someoneTyping.map((s) => (
          <div className="typing-data__person">{`${s.author} is currently typing`}</div>
        ))}
      </div>
    </>
  );
}

export default observer(App);
