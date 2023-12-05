import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import io from "socket.io-client";
const socket = io("ws://localhost:80", { transports: ["websocket"] });

function App() {
  const [chatData, setChatData] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = (chatMessage: string) => {
    // console.log(chatMessage);
    socket.emit("hello", { chatMessage });
    setText("");

    socket.on("hello", ({ chatMessage }: string) => {
      chatData && setChatData([...chatData, chatMessage]);
    });
  };
  return (
    <>
      <div>
        <ul>
          {chatData?.map((_, i) => {
            return <li key={i}>{chatData[i]}</li>;
          })}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          onClick={() => {
            sendMessage(text);
          }}
        >
          전송
        </button>
      </div>
    </>
  );
}

export default App;
