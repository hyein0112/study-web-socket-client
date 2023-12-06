import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
const socket = io("ws://localhost:80", {
  transports: ["websocket"],
  withCredentials: true,
});

function Chat() {
  // const [chatData, setChatData] = useState<string[]>(["test1", "test2"]);
  const [text, setText] = useState("");
  const ul = document.querySelector("ul");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      socket.emit("hello", { chatMessage: text });
      setText("");
      setIsSubmit(false);
    }
  }, [isSubmit, text]);

  useEffect(() => {
    socket.on("disconnection", ({ message }) => {
      const li = document.createElement("li");
      li.innerText = message;
      ul?.appendChild(li);
      socket.off();
    });

    socket.on("connection", ({ message }): void => {
      if (message) {
        const li = document.createElement("li");
        li.innerText = message;
        ul?.appendChild(li);
      }
    });
  });

  useEffect(() => {
    socket.on("hello", ({ chatMessage }: { chatMessage: string }) => {
      console.log(chatMessage);
      const li = document.createElement("li");
      li.innerText = chatMessage;
      ul?.appendChild(li);
    });
  }, [ul]);

  return (
    <>
      <div>
        <ul></ul>
      </div>
      <div>
        {/* <form action=""> */}
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          onClick={() => {
            setIsSubmit(true);
          }}
        >
          전송
        </button>
        {/* </form> */}
      </div>
    </>
  );
}

export default Chat;
