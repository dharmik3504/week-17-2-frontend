import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const messageRef = useRef();
  const wsRef = useRef();
  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="h-screen bg-black text-white flex flex-col justify-between">
      <div className="min-h-96 border">
        {messages.map((m) => (
          <div className="bg-white text-black m-4 p-4 max-w-fit">{m}</div>
        ))}
      </div>
      <div className="border border-slate-500 flex justify-between p-11">
        <input
          type="text"
          placeholder="message"
          className="w-full text-black"
          ref={messageRef}
        />
        <button
          className="rounded-md ml-3 border p-2"
          onClick={() => {
            const message = messageRef.current?.value;
            console.log(message);
            // const jsonString = JSON.stringify({
            //   type: "chat",
            //   payload: {
            //     message,
            //   },
            // });
            // wsRef.current.send(jsonString);
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default App;
