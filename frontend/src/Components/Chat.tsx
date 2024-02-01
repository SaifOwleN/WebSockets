import { useState, useEffect, SyntheticEvent } from "react";
import { socket } from "../Socket";
import { useNavigate } from "react-router-dom";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

interface MessageType {
  content: string;
  type: "message" | "join";
}

const Chat = () => {
  const [chat, setChat] = useState<Array<MessageType>>([]);
  const [message, setMessage] = useState("");
  const [ExcalidrawApi, setExcalidrawApi] = useState<ExcalidrawImperativeAPI>();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!socket.connected) {
        navigate("/");
      }
    }, 3000);

    socket.on("enter", (content: string) => {
      setChat((prevChat) => [...prevChat, { content, type: "join" }]);
    });

    socket.on("message", (content: string) => {
      setChat((prevChat) => [...prevChat, { content, type: "message" }]);
    });

    socket.on("watch", ({ excalidrawElements, appState }) => {
      console.log(excalidrawElements);
      const sceneData = {
        elements: excalidrawElements,
        appState,
      };
      ExcalidrawApi?.updateScene(sceneData);
      console.log(ExcalidrawApi?.getAppState());
    });
  }, [socket]);

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  const drawing = (excalidrawElements, appState) => {
    socket.emit("draw", { excalidrawElements, appState });
  };

  return (
    <div className="text-white bg-slate-900 h-screen flex items-center">
      <div>
        <h1>Excalidraw Example</h1>
        <div className="w-[700px] h-[400px]">
          <Excalidraw
            theme="light"
            onChange={drawing}
            excalidrawAPI={(api) => setExcalidrawApi(api)}
          />
        </div>
      </div>
      <div
        id="chat"
        className="w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-600 p-1 "
      >
        <div className="w-full h-full bg-gray-800 text-white p-4 overflow-auto">
          <h1 className="text-3xl font-bold">Chat Room</h1>
          <ul className="px-2 py-2">
            {chat.map((cha) =>
              cha.type === "message" ? (
                <li>{cha.content}</li>
              ) : (
                <li className="flex text-gray-500 justify-center">
                  {cha.content}
                </li>
              ),
            )}
          </ul>
        </div>
        <form
          onSubmit={sendMessage}
          className="flex mt-4 mb-2 w-96 mx-4"
          id="name"
        >
          <input
            className=" bg-transparent border-2 p-4 border-gray-700 w-full mr-4 rounded-3xl h-10"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <button
            className="bg-black w-20 rounded-xl text-white "
            type="submit"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
